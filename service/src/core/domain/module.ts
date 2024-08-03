import { ChildEntity, Column } from 'typeorm';
import { Item } from './item';

@ChildEntity()
export abstract class Module extends Item {
  @Column()
  specialAbilities: string;
}
