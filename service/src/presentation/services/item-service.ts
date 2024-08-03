import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ItemService as CoreItemService } from '../../core/item-service';

@Injectable()
export class ItemService extends CoreItemService {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(dataSource);
  }
}
