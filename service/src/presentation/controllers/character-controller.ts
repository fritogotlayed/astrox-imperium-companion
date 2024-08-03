import { Controller, Logger, Get, Header, Param } from '@nestjs/common';
import { CharacterService } from '../../core/character-service';

@Controller({
  path: '/characters',
})
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  private readonly logger = new Logger(CharacterController.name);

  @Get('/')
  @Header('Access-Control-Allow-Origin', '*')
  async getGameDataDirectory() {
    try {
      this.logger.log('Getting known characters');
      const values = await this.characterService.getAllCharacters();

      return {
        success: true,
        data: values,
      };
    } catch (err) {
      return {
        success: false,
        message: err.message,
      };
    }
  }

  @Get('/:name')
  @Header('Access-Control-Allow-Origin', '*')
  async getCharacterByName(@Param() params: any) {
    try {
      const name: string = params.name;
      this.logger.log(`Getting character by name: ${name}`);
      const character = await this.characterService.getCharacterByName(name);

      return {
        success: true,
        data: character,
      };
    } catch (err) {
      return {
        success: false,
        message: err.message,
      };
    }
  }

  @Get('/:id/avatar')
  @Header('Access-Control-Allow-Origin', '*')
  async getCharacterAvatar(@Param() params: any) {
    try {
      const id: string = params.id;
      this.logger.log(`Getting character avatar by id: ${id}`);
      const avatar = await this.characterService.getCharacterAvatar(id);

      return {
        success: true,
        data: avatar,
      };
    } catch (err) {
      return {
        success: false,
        message: err.message,
      };
    }
  }

  @Get('/:name/skills/:skillId/stations')
  @Header('Access-Control-Allow-Origin', '*')
  async getCharacterStationsSkill(@Param() params: any) {
    try {
      const name: string = params.name;
      const skillId: number = params.skillId;
      this.logger.log(
        `Getting character skill by name: ${name} and skillId: ${skillId}`,
      );
      const stations = await this.characterService.getStationsForSkill(
        name,
        skillId,
      );

      return {
        success: true,
        data: stations,
      };
    } catch (err) {
      return {
        success: false,
        message: err.message,
      };
    }
  }

  @Get('/:name/items/:itemId/stations')
  @Header('Access-Control-Allow-Origin', '*')
  async getCharacterStationsItem(@Param() params: any) {
    try {
      const name: string = params.name;
      const itemId: number = params.itemId;
      this.logger.log(
        `Getting character item by name: ${name} and itemId: ${itemId}`,
      );
      const stations = await this.characterService.getStationsForItem(
        name,
        itemId,
      );

      return {
        success: true,
        data: stations,
      };
    } catch (err) {
      return {
        success: false,
        message: err.message,
      };
    }
  }

  @Get('/:name/sectors')
  @Header('Access-Control-Allow-Origin', '*')
  async getCharacterSectors(@Param() params: any) {
    try {
      const name: string = params.name;
      this.logger.log(`Getting sectors by character name: ${name}`);
      const sectors = await this.characterService.getSectors(name);

      return {
        success: true,
        data: sectors,
      };
    } catch (err) {
      return {
        success: false,
        message: err.message,
      };
    }
  }

  @Get('/:name/compute-route/:fromSectorId/to/:toSectorId')
  @Header('Access-Control-Allow-Origin', '*')
  async getRouteBetweenSectors(@Param() params: any) {
    try {
      const name: string = params.name;
      let fromSectorId: number = Number(params.fromSectorId);
      const toSectorId: number = Number(params.toSectorId);

      if (fromSectorId < 0) {
        const character = await this.characterService.getCharacterByName(name);
        fromSectorId = character.currentSectorId;
      }

      if (toSectorId < 0) {
        return {
          success: false,
          message: 'Invalid toSectorId',
        };
      }

      const result = await this.characterService.computeRoute(
        name,
        fromSectorId,
        toSectorId,
      );

      return {
        success: true,
        data: result,
      };
    } catch (err) {
      return {
        success: false,
        message: err.message,
      };
    }
  }

  @Get('/:name/sectors/:sectorId')
  @Header('Access-Control-Allow-Origin', '*')
  async getSectorById(@Param() params: any) {
    try {
      const name: string = params.name;
      const sectorId: number = Number(params.sectorId);
      this.logger.log(
        `Getting sector by character name: ${name} and sectorId: ${sectorId}`,
      );
      const sector = await this.characterService.getSectorById(name, sectorId);

      return {
        success: true,
        data: sector,
      };
    } catch (err) {
      return {
        success: false,
        message: err.message,
      };
    }
  }
}
