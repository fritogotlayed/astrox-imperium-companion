import config from 'config';
import { type DataSourceOptions } from 'typeorm';
import { CustomNamingStrategy } from './custom-naming-strategy';

export const dataSourceOptions: Partial<DataSourceOptions> = {
  ...config.get<Partial<DataSourceOptions>>('typeorm'),
  namingStrategy: new CustomNamingStrategy(),
  migrations: ['src/infrastructure/migrations/*.ts'],
  subscribers: ['src/infrastructure/subscribers/*.ts'],
};
