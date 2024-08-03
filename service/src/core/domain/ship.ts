import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { ShipSpecial } from './ship-special';

@Entity()
export class Ship {
  @PrimaryColumn()
  id: string;

  @Column()
  baseLevel: number;

  @Column()
  skillLevel: number;

  @Column()
  factionId: number;

  @Column()
  name: string;

  @Column()
  class: string;

  @Column()
  baseShield: number;

  @Column()
  baseArmor: number;

  @Column()
  baseEnergy: number;

  @Column()
  baseCargo: number;

  @Column()
  baseSpeed: number;

  @Column({ type: 'float' })
  baseTurn: number;

  @Column()
  baseThrust: number;

  @Column()
  baseMass: number;

  @Column()
  activeSlots: number;

  @Column()
  passiveSlots: number;

  @Column()
  baseLifeSupport: number;

  @Column({ type: 'float' })
  baseEngineBurn: number;

  @Column({ type: 'float' })
  baseRecharge: number;

  @Column({ type: 'float' })
  baseShieldRecharge: number;

  @Column({ type: 'float' })
  baseScanSpeed: number;

  @Column()
  baseScanMaxTargets: number;

  @Column()
  baseScanPulseRange: number;

  @Column()
  baseScanPulseSpeed: number;

  @Column()
  type: string;

  @Column()
  basePrice: number;

  @Column()
  description: string;

  @Column({ type: 'float' })
  impactResistance: number;

  @Column({ type: 'float' })
  energyResistance: number;

  @Column({ type: 'float' })
  explosiveResistance: number;

  @Column()
  manufacturer: string;

  @Column()
  manufacturerIcon: string;

  @Column()
  baseDrones: number;

  @OneToMany(() => ShipSpecial, (shipSpecial) => shipSpecial.shipId, {
    cascade: false,
    eager: false,
  })
  specials: ShipSpecial[];
}
