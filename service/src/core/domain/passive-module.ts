import { ChildEntity, Column } from 'typeorm';
import { Module } from './module';

@ChildEntity()
export class PassiveModule extends Module {
  @Column()
  specialType: string;

  @Column()
  specialMode: string;

  @Column({ type: 'float' })
  specialValue: number;
}
