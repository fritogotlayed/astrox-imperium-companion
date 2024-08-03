import { MarketItem } from './item';
import { ChildEntity, Column } from 'typeorm';

@ChildEntity()
export class LifeSupport extends MarketItem {
  @Column({ type: 'float' })
  bonusMultiplier: number;
}
