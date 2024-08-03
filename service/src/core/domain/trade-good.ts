import { ChildEntity } from 'typeorm';
import { MarketItem } from './item';

@ChildEntity()
export class TradeGood extends MarketItem {}
