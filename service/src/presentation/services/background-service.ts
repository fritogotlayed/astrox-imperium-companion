import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { SystemService } from './system-service';
import { SystemConfigurationKeys } from '../../core/system-service';

@Injectable()
export class BackgroundService {
  constructor(
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly systemService: SystemService,
  ) {}

  private readonly logger = new Logger('BackgroundService');

  @Cron(CronExpression.EVERY_SECOND, { name: 'background-service' })
  async handleCron() {
    // TODO: Check environment variable for game data directory and set it if
    // the value is currently unset. This is to support future expansion into docker

    const gameDataDirectory = await this.systemService.getConfigurationValue(
      SystemConfigurationKeys.GameDataDirectory,
    );
    if (gameDataDirectory) {
      this.schedulerRegistry.deleteCronJob('background-service');

      this.systemService
        .enableDirectoryWatcher()
        .then(() => this.logger.log('Directory watcher successfully enabled'))
        .catch((error) =>
          this.logger.error('Failed to enable directory watcher', error),
        );
    }
  }
}
