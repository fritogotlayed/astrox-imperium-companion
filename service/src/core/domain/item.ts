import {
  ChildEntity,
  Column,
  Entity,
  PrimaryColumn,
  TableInheritance,
} from 'typeorm';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'entity_type' } })
export abstract class Item {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  class: string;

  @Column()
  subClass: string;

  @Column()
  image: string;

  @Column({ type: 'float' })
  baseSize: number;

  @Column({ type: 'float' })
  basePrice: number;

  @Column()
  level: number;

  @Column()
  isStackable: boolean;

  @Column()
  description: string;
}

@ChildEntity()
export abstract class MarketItem extends Item {
  @Column()
  prefabId: number;

  @Column()
  model: string;
}
