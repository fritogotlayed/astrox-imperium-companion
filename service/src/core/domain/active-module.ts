import { ChildEntity, Column } from 'typeorm';
import { Module } from './module';

@ChildEntity()
export class ActiveModule extends Module {
  @Column()
  prefabId: number;

  @Column()
  ammoPrefabId: number;

  @Column({ type: 'float' })
  cycleRate: number;

  @Column({ type: 'float' })
  turnSpeed: number;

  @Column({ type: 'float' })
  maxRange: number;

  @Column({ type: 'float' })
  mobilityRange: number;

  @Column({ type: 'float' })
  projectileSpeed: number;

  @Column({ type: 'float' })
  energyUsage: number;

  @Column({ type: 'float' })
  durabilityPoints: number;

  @Column({ type: 'float' })
  baseDamage: number;
}
