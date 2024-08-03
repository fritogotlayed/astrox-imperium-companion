import { join } from 'node:path';
import { DataSource, In } from 'typeorm';
import { Character } from './domain/character';
import { Configuration } from './domain/configuration';
import sharp from 'sharp';
import { SkillAvailableAtStation } from './domain/skill-available-at-station';
import { Skill } from './domain/skill';
import { Sector } from './domain/sector';
import { Station } from './domain/station';
import { ItemAvailableAtStation } from './domain/item-available-at-station';
import { Item } from './domain/item';
import Graph from 'node-dijkstra';
import { WarpGate } from './domain/warpGate';
import {
  SectorResource,
  SectorResourceCluster,
} from './domain/sector-resource';

export class CharacterService {
  constructor(private readonly dataSource: DataSource) {}

  async getAllCharacters() {
    return await this.dataSource.manager.find(Character);
  }

  async getCharacterByName(name: string) {
    return await this.dataSource.manager.findOne(Character, {
      relations: ['skills', 'skills.skill'],
      where: {
        name,
      },
    });
  }

  async getCharacterAvatar(id: string) {
    const configuration = await this.dataSource.manager.findOneBy(
      Configuration,
      { key: 'game-data-directory' },
    );

    const gameDataDirectory = configuration?.value;

    const characterData = await this.dataSource.manager.findOne(Character, {
      where: {
        name: id,
      },
    });

    const facePath = join(
      gameDataDirectory,
      'scripting',
      'npcs',
      'faces',
      characterData.face1,
    );
    const face2Path = join(
      gameDataDirectory,
      'scripting',
      'npcs',
      'faces',
      characterData.face2,
    );

    // Combine the two images and return that to the caller as the avatar
    const avatarBuffer = await sharp(facePath)
      .composite([{ input: face2Path, gravity: 'northwest' }])
      .toBuffer();

    const base64 = avatarBuffer.toString('base64');
    return `data:image/png;base64,${base64}`;
  }

  async getStationsForSkill(name: string, skillId: number) {
    const [availableMatches, character, skill] = await Promise.all([
      this.dataSource.manager.find(SkillAvailableAtStation, {
        where: {
          characterName: name,
          skillId,
        },
      }),
      this.dataSource.manager.findOne(Character, {
        where: {
          name,
        },
      }),
      this.dataSource.manager.findOne(Skill, {
        where: {
          id: skillId,
        },
      }),
    ]);

    const sectors = await this.dataSource.manager.find(Sector, {
      where: {
        id: In(availableMatches.map((a) => a.sectorId)),
        characterName: name,
      },
    });

    const stations = await this.dataSource.manager.find(Station, {
      where: availableMatches.map((a) => ({
        sectorId: a.sectorId,
        id: a.stationId,
        characterName: name,
      })),
    });

    return {
      sectors,
      stations,
      skill,
      character,
    };
  }

  async getStationsForItem(name: string, itemId: number) {
    const [availableMatches, character, item] = await Promise.all([
      this.dataSource.manager.find(ItemAvailableAtStation, {
        where: {
          characterName: name,
          itemId,
        },
      }),
      this.dataSource.manager.findOne(Character, {
        where: {
          name,
        },
      }),
      this.dataSource.manager.findOne(Item, {
        where: {
          id: itemId,
        },
      }),
    ]);

    const sectors = await this.dataSource.manager.find(Sector, {
      where: {
        id: In(availableMatches.map((a) => a.sectorId)),
        characterName: name,
      },
    });

    const stations = await this.dataSource.manager.find(Station, {
      where: availableMatches.map((a) => ({
        sectorId: a.sectorId,
        id: a.stationId,
        characterName: name,
      })),
    });

    return {
      sectors,
      stations,
      item,
      character,
    };
  }

  async getSectors(characterName: string) {
    return await this.dataSource.manager.find(Sector, {
      where: {
        characterName,
      },
    });
  }

  async computeRoute(
    characterName: string,
    startSectorId: number,
    endSectorId: number,
  ) {
    const warpgates = await this.dataSource.manager.find(WarpGate, {
      where: {
        characterName,
      },
    });
    const distinctSectorIds = Array.from(
      new Set(warpgates.map((w) => w.sectorId)),
    );

    const graph = new Graph();

    // Populate the graph with all the warpgates at 1 weight for now
    const weight = 1;
    for (const sectorId of distinctSectorIds) {
      const sectorWarpgates = warpgates.filter((w) => w.sectorId === sectorId);
      const neighbors = {
        ...Object.fromEntries(
          sectorWarpgates.map((w) => [
            w.destinationSectorId.toString(),
            weight,
          ]),
        ),
      };
      graph.addNode(sectorId.toString(), neighbors);
    }

    const route = graph.path(
      startSectorId.toString(),
      endSectorId.toString(),
    ) as string[];

    if (!route) {
      return [];
    }

    const sectors = await this.dataSource.manager.find(Sector, {
      where: {
        id: In(route.map((p) => parseInt(p, 10))),
        characterName,
      },
    });

    // Order the sectors in the order they are in the route
    return route.map((r) => sectors.find((s) => s.id === parseInt(r, 10)));
  }

  async getSectorById(name: string, sectorId: number) {
    return await this.dataSource.manager.transaction(async (manager) => {
      const sector = await manager.findOne(Sector, {
        where: {
          characterName: name,
          id: sectorId,
        },
      });

      const stations = await manager.find(Station, {
        where: {
          characterName: name,
          sectorId,
        },
      });

      const warpGates = await manager.find(WarpGate, {
        where: {
          characterName: name,
          sectorId,
        },
      });

      const warpGateDestinations = await manager.find(Sector, {
        select: ['id', 'name'],
        where: {
          id: In(warpGates.map((w) => w.destinationSectorId)),
          characterName: name,
        },
      });

      const availableItems = await manager.find(ItemAvailableAtStation, {
        where: {
          characterName: name,
          sectorId,
        },
      });

      const availableSkills = await manager.find(SkillAvailableAtStation, {
        where: {
          characterName: name,
          sectorId,
        },
      });

      const availableResources = await manager.find(SectorResource, {
        where: {
          characterName: name,
          sectorId,
        },
      });

      const skills = await manager.find(Skill, {
        where: {
          id: In(availableSkills.map((a) => a.skillId)),
        },
      });

      const items = await manager.find(Item, {
        where: {
          id: In([
            ...availableItems.map((a) => a.itemId),
            ...availableResources.map((a) => a.resourceId),
          ]),
        },
      });

      return {
        sector,
        stations,
        warpGates: [
          ...warpGates.map((w) => {
            const destination = warpGateDestinations.find(
              (d) => d.id === w.destinationSectorId,
            );
            return {
              ...w,
              destinationSectorName: destination?.name,
            };
          }),
        ],
        availableItems,
        availableSkills,
        availableResources,
        items,
        skills,
      };
    });
  }
}
