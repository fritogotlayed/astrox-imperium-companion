import { Module } from '@nestjs/common';
import { ItemController } from '../controllers/item-controller';
import { ItemService } from '../services/item-service';
import { ItemService as CoreItemService } from '../../core/item-service';

@Module({
  imports: [],
  controllers: [ItemController],
  providers: [
    {
      provide: CoreItemService,
      useClass: ItemService,
    },
  ],
})
export class ItemModule {}
