import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Configuration {
  @PrimaryColumn()
  key: string;

  @Column()
  value: string;
}
