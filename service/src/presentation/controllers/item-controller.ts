import { Controller, Logger, Get, Header, Param } from '@nestjs/common';
import { ItemService } from '../../core/item-service';

@Controller({
  path: '/items',
})
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  private readonly logger = new Logger(ItemController.name);

  @Get('/')
  @Header('Access-Control-Allow-Origin', '*')
  async getItems() {
    try {
      this.logger.log('Getting all items');
      const values = await this.itemService.getAllItems();

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
  async getItemById(@Param() params: any) {
    try {
      const id: string = params.id;
      this.logger.log(`Getting item by id: ${id}`);
      const character = await this.itemService.getById(Number(id));

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
  async getItemIcon(@Param() params: any) {
    try {
      const id: string = params.id;
      this.logger.log(`Getting item image by id: ${id}`);
      const character = await this.itemService.getItemIcon(Number(id));

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
