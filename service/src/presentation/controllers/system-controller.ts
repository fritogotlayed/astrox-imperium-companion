import {
  Body,
  Controller,
  Post,
  Put,
  Logger,
  Get,
  Header,
} from '@nestjs/common';
import {
  SystemConfigurationKeys,
  SystemService,
} from '../../core/system-service';
import { UpdateConfigurationRequestBody } from '../schemas/update-configuration-request-body';

@Controller({
  path: '/system',
})
export class SystemController {
  constructor(private readonly systemService: SystemService) {}

  private readonly logger = new Logger(SystemController.name);

  @Get('/game-data-directory')
  @Header('Access-Control-Allow-Origin', '*')
  async getGameDataDirectory() {
    try {
      this.logger.log('Getting game data directory');
      const value = await this.systemService.getConfigurationValue(
        SystemConfigurationKeys.GameDataDirectory,
      );

      return {
        success: true,
        data: {
          value,
        },
      };
    } catch (err) {
      return {
        success: false,
        message: err.message,
      };
    }
  }

  @Put('/game-data-directory')
  @Header('Access-Control-Allow-Origin', '*')
  async updateGameDataDirectory(
    @Body() { value }: UpdateConfigurationRequestBody,
  ) {
    try {
      this.logger.log('Updating game data directory');
      await this.systemService.updateConfigurationValue(
        SystemConfigurationKeys.GameDataDirectory,
        value,
      );

      return {
        success: true,
        message: 'Configuration updated',
      };
    } catch (err) {
      return err.message;
    }
  }

  @Post('/import-data')
  @Header('Access-Control-Allow-Origin', '*')
  async importData() {
    this.logger.log('Dispatching import data');
    this.systemService
      .importData()
      .then(() => this.systemService.importDataForCharacter())
      .then(() => this.logger.log('Data imported'))
      .catch(console.error);

    return {
      success: true,
      message: 'Data import started',
    };
  }

  // @Post('/import-data/:characterName')
  // @Header('Access-Control-Allow-Origin', '*')
  // async importDataForCharacter(@Param('characterName') characterName: string) {
  //   this.logger.log(`Dispatching import data for ${characterName}`);
  //   this.systemService
  //     .importDataForCharacter(characterName)
  //     .then(() => this.logger.log(`Data imported for ${characterName}`))
  //     .catch(console.error);
  //
  //   return {
  //     success: true,
  //     message: `Data import started for ${characterName}`,
  //   };
  // }
}
