import { DataSource } from 'typeorm';
import { Configuration } from './domain/configuration';
import { join } from 'node:path';
import sharp from 'sharp';
import { Item } from './domain/item';

export class ItemService {
  constructor(private readonly dataSource: DataSource) {}

  async getAllItems() {
    return (await this.dataSource.manager.find(Item)).map((item) => ({
      ...item,
      entityType: undefined,
    }));
  }

  async getById(id: number) {
    const item = await this.dataSource.manager.findOne(Item, {
      where: {
        id,
      },
    });
    return {
      ...item,
      entityType: undefined,
    };
  }

  async getItemIcon(id: number) {
    const configuration = await this.dataSource.manager.findOneBy(
      Configuration,
      { key: 'game-data-directory' },
    );

    const gameDataDirectory = configuration?.value;

    const item = await this.dataSource.manager.findOne(Item, {
      where: {
        id,
      },
    });

    const iconPath = join(gameDataDirectory, 'items', item.image);

    const iconBuffer = await sharp(iconPath).toBuffer();

    const base64 = iconBuffer.toString('base64');
    return `data:image/png;base64,${base64}`;
  }
}
