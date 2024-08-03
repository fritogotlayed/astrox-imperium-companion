import { MarketItem } from './item';
import { ChildEntity, Column } from 'typeorm';

@ChildEntity()
export class Ammunition extends MarketItem {
  @Column({ type: 'float' })
  impactDamage: number;

  @Column({ type: 'float' })
  energyDamage: number;

  @Column({ type: 'float' })
  explosiveDamage: number;
}
