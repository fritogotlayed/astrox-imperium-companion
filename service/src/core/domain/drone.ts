import { MarketItem } from './item';
import { ChildEntity, Column } from 'typeorm';

@ChildEntity()
export class Drone extends MarketItem {
  @Column()
  range: number;

  @Column()
  speed: number;

  @Column()
  hp: number;

  @Column()
  energy: number;

  @Column()
  specials: string;

  @Column()
  cargoMax: number;

  @Column()
  special: string;
}
