import { readdir, readFile } from 'node:fs/promises';
import { Sector } from '../../core/domain/sector';
import { mapNullStringToNull } from './common';
import { WarpGate } from '../../core/domain/warpGate';
import {
  SectorResourceAsteroid,
  SectorResourceCluster,
} from '../../core/domain/sector-resource';

export async function* loadSectorForCharacter(
  baseDirectory: string,
  characterName: string,
  fileName: string,
) {
  const fileData = await readFile(
    `${baseDirectory}/saves/${characterName}/sectors/${fileName}`,
  );

  let resourceIndex: number = 0;

  // in the string "sector_0.txt", the sector_id is 0
  const [_, sectorIdStr] = fileName.replace('.txt', '').split('_');
  const id = parseInt(sectorIdStr, 10);

  const sector = new Sector();
  sector.id = id;
  sector.characterName = characterName;
  for (const line of fileData.toString().split('\n')) {
    line.startsWith('SECTOR;name;') &&
      (sector.name = line.split(';')[2].trim());
    line.startsWith('SECTOR;level;') &&
      (sector.level = parseFloat(line.split(';')[2].trim()));
    line.startsWith('SECTOR;faction;') &&
      (sector.faction = line.split(';')[2].trim());
    line.startsWith('SECTOR;is_explored;') &&
      (sector.isExplored = line.split(';')[2].trim().toLowerCase() === 'true');
    line.startsWith('SECTOR;energy;') &&
      (sector.energy = parseFloat(line.split(';')[2].trim()));
    line.startsWith('SECTOR;population;') &&
      (sector.population = parseFloat(line.split(';')[2].trim()));
    line.startsWith('SECTOR;habitation;') &&
      (sector.habitation = parseFloat(line.split(';')[2].trim()));
    line.startsWith('SECTOR;farming;') &&
      (sector.farming = parseFloat(line.split(';')[2].trim()));
    line.startsWith('SECTOR;economy;') &&
      (sector.economy = parseFloat(line.split(';')[2].trim()));
    line.startsWith('SECTOR;production;') &&
      (sector.production = parseFloat(line.split(';')[2].trim()));
    line.startsWith('SECTOR;defense;') &&
      (sector.defence = parseFloat(line.split(';')[2].trim()));
    line.startsWith('SECTOR;environment;') &&
      (sector.environment = parseFloat(line.split(';')[2].trim()));
    line.startsWith('SECTOR;wormhole_type;') &&
      (sector.wormholeType = mapNullStringToNull(line.split(';')[2].trim(), {
        emptyStringToNull: true,
      }));
    line.startsWith('SECTOR;event_type;') &&
      (sector.eventType = mapNullStringToNull(line.split(';')[2].trim()));

    if (
      line.startsWith('WARPGATE;') &&
      !(line.includes(';generate;') || line.includes(';wormhole;'))
    ) {
      const parts = line.split(';').map((e) => e.trim());
      const warpGate = new WarpGate();
      let destinationSector: number | undefined;
      try {
        destinationSector = parseInt(
          parts[2].split('_')[1].replace('.txt', ''),
          10,
        );
      } catch (err) {
        console.log({
          sectorId: sector.id,
          line,
        });
      }

      warpGate.id = parseInt(parts[1], 10);
      warpGate.sectorId = sector.id;
      warpGate.characterName = characterName;
      warpGate.destinationSectorId = destinationSector;
      warpGate.destinationWarpGateId = parseInt(parts[3], 10);
      warpGate.toll = parseInt(parts[7], 10);
      warpGate.factionId = parts[8];
      yield warpGate;
    }

    if (line.startsWith('CLUSTER;')) {
      const parts = line.split(';').map((e) => e.trim());
      const cluster = new SectorResourceCluster();
      cluster.id = resourceIndex++;
      cluster.sectorId = sector.id;
      cluster.characterName = characterName;
      cluster.resourceId = parseInt(parts[1], 10);
      cluster.numberOfResources = parseInt(parts[2], 10);
      cluster.minimumSize = parseInt(parts[3], 10);
      cluster.maximumSize = parseInt(parts[4], 10);
      cluster.spreadDistance = parseInt(parts[5], 10);
      cluster.xPosition = parseFloat(parts[6]);
      cluster.yPosition = parseFloat(parts[7]);
      cluster.zPosition = parseFloat(parts[8]);
      yield cluster;
    }

    if (line.startsWith('RESOURCE;')) {
      const parts = line.split(';').map((e) => e.trim());
      const asteroid = new SectorResourceAsteroid();
      asteroid.id = resourceIndex++;
      asteroid.sectorId = sector.id;
      asteroid.characterName = characterName;
      asteroid.resourceId = parseInt(parts[1], 10);
      asteroid.xPosition = parseFloat(parts[2]);
      asteroid.yPosition = parseFloat(parts[3]);
      asteroid.zPosition = parseFloat(parts[4]);
      asteroid.maxValue = parseInt(parts[5], 10);
      asteroid.currentValue = parseInt(parts[6], 10);
      yield asteroid;
    }
  }

  yield sector;
}

export async function* loadSectorsForCharacter(
  baseDirectory: string,
  characterName: string,
) {
  const entities = await readdir(
    `${baseDirectory}/saves/${characterName}/sectors`,
    {
      withFileTypes: true,
    },
  );

  for (const entity of entities) {
    if (entity.isFile() && entity.name.endsWith('.txt')) {
      yield* loadSectorForCharacter(baseDirectory, characterName, entity.name);
    }
  }
}

export async function* loadSectors(baseDirectory: string) {
  const entities = await readdir(`${baseDirectory}/saves`, {
    withFileTypes: true,
  });

  for (const entity of entities) {
    if (entity.isDirectory()) {
      yield* loadSectorsForCharacter(baseDirectory, entity.name);
    }
  }
}
