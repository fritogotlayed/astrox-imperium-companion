import { Controller, Logger, Get, Header, Param } from '@nestjs/common';
import { SkillService } from '../../core/skill-service';

@Controller({
  path: '/skills',
})
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  private readonly logger = new Logger(SkillController.name);

  @Get('/')
  @Header('Access-Control-Allow-Origin', '*')
  async getSkills() {
    try {
      this.logger.log('Getting all skills');
      const values = await this.skillService.getAllSkills();

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

  @Get('/:id')
  @Header('Access-Control-Allow-Origin', '*')
  async getSkillById(@Param() params: any) {
    try {
      const id: string = params.id;
      this.logger.log(`Getting skill by id: ${id}`);
      const character = await this.skillService.getById(Number(id));

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

  @Get('/:id/icon')
  @Header('Access-Control-Allow-Origin', '*')
  async getSkillIcon(@Param() params: any) {
    try {
      const id: string = params.id;
      this.logger.log(`Getting skill image by id: ${id}`);
      const character = await this.skillService.getSkillIcon(Number(id));

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
}
