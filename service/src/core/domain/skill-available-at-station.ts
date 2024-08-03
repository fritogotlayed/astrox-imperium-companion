import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class SkillAvailableAtStation {
  @PrimaryColumn()
  characterName: string;

  @PrimaryColumn()
  sectorId: number;

  @PrimaryColumn()
  stationId: number;

  @PrimaryColumn()
  skillId: number;

  @Column({ type: 'float' })
  priceModifier: number;
}
