import { MarketItem } from './item';
import { ChildEntity } from 'typeorm';

@ChildEntity()
export class Material extends MarketItem {}
