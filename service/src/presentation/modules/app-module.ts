import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app-controller';
import { AppService } from '../../core/app-service';
import { SystemModule } from './system-module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../../infrastructure/data-source-options';
import path from 'node:path';
import { CharacterModule } from './character-module';
import { SkillModule } from './skill-module';
import { ItemModule } from './item-module';
import { BackgroundService } from '../services/background-service';
import { ScheduleModule } from '@nestjs/schedule';
import { SystemService } from '../services/system-service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      ...dataSourceOptions,

      // HACK: getting "Cannot use import statement outside a module" error when running nest
      entities: [path.join(__dirname, '../../core/domain/**/*{.ts,.js}')],
      migrations: [
        path.join(__dirname, '../../infrastructure/migrations/**/*{.ts,.js}'),
      ],
      subscribers: [
        path.join(__dirname, '../../infrastructure/subscribers/**/*{.ts,.js}'),
      ],
    }),
    SystemModule,
    CharacterModule,
    SkillModule,
    ItemModule,
  ],
  controllers: [AppController],
  providers: [AppService, SystemService, BackgroundService],
})
export class AppModule {
  constructor() {}
}
