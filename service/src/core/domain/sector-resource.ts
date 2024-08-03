import {
  ChildEntity,
  Column,
  Entity,
  PrimaryColumn,
  TableInheritance,
} from 'typeorm';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'entity_type' } })
export abstract class SectorResource {
  @PrimaryColumn()
  id: number;

  @PrimaryColumn()
  sectorId: number;

  @PrimaryColumn()
  characterName: string;

  @Column()
  resourceId: number;

  @Column({ type: 'float' })
  xPosition: number;

  @Column({ type: 'float' })
  yPosition: number;

  @Column({ type: 'float' })
  zPosition: number;
}

@ChildEntity()
export class SectorResourceCluster extends SectorResource {
  @Column()
  numberOfResources: number;

  @Column()
  minimumSize: number;

  @Column()
  maximumSize: number;

  @Column()
  spreadDistance: number;
}

@ChildEntity()
export class SectorResourceAsteroid extends SectorResource {
  @Column()
  maxValue: number;

  @Column()
  currentValue: number;
}
