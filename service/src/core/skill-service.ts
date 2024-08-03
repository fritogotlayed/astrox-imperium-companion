import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Skill } from './domain/skill';
import { Configuration } from './domain/configuration';
import { join } from 'node:path';
import sharp from 'sharp';

@Injectable()
export class SkillService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async getAllSkills() {
    return await this.dataSource.manager.find(Skill);
  }

  async getById(id: number) {
    return await this.dataSource.manager.findOne(Skill, {
      where: {
        id,
      },
    });
  }

  async getSkillIcon(id: number) {
    const configuration = await this.dataSource.manager.findOneBy(
      Configuration,
      { key: 'game-data-directory' },
    );

    const gameDataDirectory = configuration?.value;

    const skill = await this.dataSource.manager.findOne(Skill, {
      where: {
        id,
      },
    });

    const iconPath = join(gameDataDirectory, 'skills', skill.icon);

    const iconBuffer = await sharp(iconPath).toBuffer();

    const base64 = iconBuffer.toString('base64');
    return `data:image/png;base64,${base64}`;
  }
}
