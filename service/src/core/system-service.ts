import { DataSource } from 'typeorm';
import { Configuration } from './domain/configuration';
import { loadSkills } from '../infrastructure/importers/load-skills';
import { loadShips } from '../infrastructure/importers/load-ships';
import { loadItems } from '../infrastructure/importers/load-items';
import {
  loadCharacter,
  loadCharacters,
} from '../infrastructure/importers/load-characters';
import {
  loadSectorForCharacter,
  loadSectors,
} from '../infrastructure/importers/load-sectors';
import {
  loadStationForCharacter,
  loadStations,
} from '../infrastructure/importers/load-stations';

import { FSWatcher, watch } from 'node:fs';
import { stat } from 'node:fs/promises';
import { Character } from './domain/character';
import { Logger } from '@nestjs/common';

export enum SystemConfigurationKeys {
  GameDataDirectory = 'game-data-directory',
}

export class SystemService {
  constructor(private readonly dataSource: DataSource) {}

  private directoryWatcher: FSWatcher | undefined;
  private logger = new Logger(SystemService.name);
  private pendingFileProcesses: Map<string, NodeJS.Timeout> = new Map();

  async validateGameDataDirectory(gameDataDirectory: string) {
    if (!gameDataDirectory) {
      throw new Error('Invalid gameDataDirectory value');
    }

    // Check for the "saves", "items", "skills", and "ships" directories
    const requiredDirectories = ['saves', 'items', 'skills', 'ships'];
    for (const requiredDirectory of requiredDirectories) {
      try {
        const dirStat = await stat(`${gameDataDirectory}/${requiredDirectory}`);
        if (!dirStat.isDirectory()) {
          console.error(`Missing required directory: ${requiredDirectory}`);
          return false;
        }
      } catch (err) {
        console.error(`Missing required directory: ${requiredDirectory}`);
        return false;
      }
    }
    return true;
  }

  async updateConfigurationValue(key: string, value: string) {
    if (key === SystemConfigurationKeys.GameDataDirectory) {
      await this.updateGameDataDirectory(value);
    } else {
      await this.dataSource.manager.save(Configuration, { key, value });
    }
  }

  async updateGameDataDirectory(value: string) {
    if (!(await this.validateGameDataDirectory(value))) {
      throw new Error('Invalid gameDataDirectory value');
    }

    await this.dataSource.manager.save(Configuration, {
      key: SystemConfigurationKeys.GameDataDirectory,
      value,
    });

    if (this.directoryWatcher) {
      this.logger.log('Clearing existing directory watcher');
      try {
        this.directoryWatcher.close();
      } catch (err) {
        /* do nothing */
      }
      await new Promise((resolve) => setTimeout(resolve, 5));
      this.directoryWatcher = undefined;
    }
    await this.enableDirectoryWatcher();
  }

  async getConfigurationValue(key: string) {
    const configuration = await this.dataSource.manager.findOneBy(
      Configuration,
      { key },
    );

    return configuration?.value;
  }

  async importData() {
    const gameDataDirectory = await this.getConfigurationValue(
      SystemConfigurationKeys.GameDataDirectory,
    );
    if (!gameDataDirectory) {
      throw new Error('game_data_directory not set');
    }

    await this.dataSource.manager.transaction(async (manager) => {
      for await (const item of loadSkills(gameDataDirectory)) {
        await manager.save(item);
      }

      for await (const item of loadShips(gameDataDirectory)) {
        await manager.save(item);
      }

      for await (const item of loadItems(gameDataDirectory)) {
        await manager.save(item);
      }
    });
  }

  async importDataForCharacter() {
    const gameDataDirectory = await this.getConfigurationValue(
      SystemConfigurationKeys.GameDataDirectory,
    );
    if (!gameDataDirectory) {
      throw new Error('game_data_directory not set');
    }

    // await this.updateConfigurationValue(`${characterName}-imported`, 'false');

    await this.dataSource.transaction(async (manager) => {
      for await (const item of loadCharacters(gameDataDirectory)) {
        // if we are importing data for a specific character
        if (item instanceof Character) {
          const character = await manager.findOne(Character, {
            where: {
              name: item.name,
            },
          });

          if (character && character.nextLevelXp != item.nextLevelXp) {
            item.previousLevelXp = character.nextLevelXp;
          }
        }

        await manager.save(item);
      }

      for await (const item of loadSectors(gameDataDirectory)) {
        // TODO: remove try catch
        try {
          await manager.save(item);
        } catch (err) {
          console.error('Error importing sector', err);
          console.dir(item);
          throw err;
        }
      }

      for await (const item of loadStations(gameDataDirectory)) {
        await manager.save(item);
      }

      // await this.updateConfigurationValue(`${characterName}-imported`, 'true');
    });
  }

  async enableDirectoryWatcher() {
    const gameDataDirectory = await this.getConfigurationValue(
      SystemConfigurationKeys.GameDataDirectory,
    );
    if (!gameDataDirectory) {
      throw new Error('game_data_directory not set');
    }

    try {
      if (this.directoryWatcher) {
        console.log('Directory watcher already enabled');
        return;
      }
      this.logger.log('Enabling directory watcher');
      this.directoryWatcher = watch(
        gameDataDirectory,
        {
          recursive: true,
        },
        async (event, filename) => {
          if (
            filename.startsWith('saves') &&
            filename.indexOf('/journal/') === -1 &&
            !filename.match(/saves\/.+?\/log_notifications\.txt/)
          ) {
            try {
              // this.logger.debug(`Detected update of file: ${filename}`);

              // extract the character name from the path
              const characterName = filename.match(/saves\/(.+?)\//)[1];

              // Import player data when updated
              if (filename.endsWith('player_data.txt')) {
                await this.processPlayerFile(gameDataDirectory, characterName);
              }

              // Import sector data when updated
              const sectorFileName = filename.match(/sectors\/(.+?)$/);
              if (sectorFileName) {
                await this.processPlayerSectorFile(
                  gameDataDirectory,
                  characterName,
                  sectorFileName[1],
                );
              }

              // Import station data when updated
              const stationFileName = filename.match(/stations\/(.+?)$/);
              if (stationFileName) {
                await this.processPlayerStationFile(
                  gameDataDirectory,
                  characterName,
                  stationFileName[1],
                );
              }
            } catch (err) {
              // NOTE: More often than not this is a race condition where something already got inserted
              console.error('Error importing data', err);
              console.dir({
                event,
                filename,
                err,
              });
            }
          }
        },
      );
    } catch (err) {
      if ((err as Error).message === 'AbortError') {
        console.log('Watch aborted');
        return;
      }
      throw err;
    }
  }

  /**
   * Process a file update
   *
   * This function will schedule a file update to be processed. If a file update is already scheduled for the same file,
   * it will be ignored. This is done because some OSs will trigger multiple events for the same file update. I.e. the
   * file contents is updated, then the file timestamps are updated, then the file is closed. This will cause multiple
   * events to be triggered for the same file update potentially resulting in a race condition.
   * @param key The key to use to ensure we only process one update at a time
   * @param dataGenerator A function that returns an async iterable of items to save
   * @param preProcessItem An optional function to call to pre-process each item before saving
   * @private
   */
  private async processFile<T>(
    key: string,
    dataGenerator: () => AsyncIterable<T>,
    preProcessItem?: (item: T) => Promise<T>,
  ) {
    if (this.pendingFileProcesses.has(key)) {
      return;
    }

    const timeout = setTimeout(async () => {
      await this.dataSource.manager.transaction(async (manager) => {
        for await (const item of dataGenerator()) {
          const updatedItem: T = preProcessItem
            ? await preProcessItem(item)
            : item;
          await manager.save(updatedItem);
        }
      });

      this.logger.debug(`update for ${key} completed.`);
      this.pendingFileProcesses.delete(key);
    }, 500);

    this.logger.debug(`Scheduling update for ${key}`);
    this.pendingFileProcesses.set(key, timeout);
  }

  private async processPlayerFile(
    gameDataDirectory: string,
    characterName: string,
  ) {
    await this.processFile(
      characterName,
      () => loadCharacter(gameDataDirectory, characterName),
      async (item) => {
        // if we are importing data for a specific character
        if (item instanceof Character) {
          const character = await this.dataSource.manager.findOne(Character, {
            where: {
              name: item.name,
            },
          });

          if (character && character.nextLevelXp != item.nextLevelXp) {
            item.previousLevelXp = character.nextLevelXp;
          }
        }

        return item;
      },
    );
  }

  private async processPlayerSectorFile(
    gameDataDirectory: string,
    characterName: string,
    sectorFileName: string,
  ) {
    await this.processFile(`${characterName}-${sectorFileName}`, () =>
      loadSectorForCharacter(gameDataDirectory, characterName, sectorFileName),
    );
  }

  private async processPlayerStationFile(
    gameDataDirectory: string,
    characterName: string,
    stationFileName: string,
  ) {
    await this.processFile(`${characterName}-${stationFileName}`, () =>
      loadStationForCharacter(
        gameDataDirectory,
        characterName,
        stationFileName,
      ),
    );
  }
}
