import { ChildEntity, Column } from 'typeorm';
import { MarketItem } from './item';

@ChildEntity()
export class Document extends MarketItem {
  @Column()
  recipe: string;

  @Column()
  quantity: number;
}
