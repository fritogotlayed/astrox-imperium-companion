import { ChildEntity, Column } from 'typeorm';
import { MarketItem } from './item';

@ChildEntity()
export class Resource extends MarketItem {
  @Column()
  refine: string;

  @Column()
  maxValue: number;

  @Column()
  baseHarvest: number;

  @Column()
  canGrow: boolean;

  @Column()
  growRate: number;

  @Column()
  growValue: number;

  @Column()
  harvestItems: string;

  @Column()
  categoryType: string;
}
