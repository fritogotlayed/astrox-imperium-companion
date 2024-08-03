import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class WarpGate {
  // NOTE: no foreign key constraints on this given that we discover them a sector at a time.
  // This means we can't guarantee that the sector exists when we import the warpgate.
  @PrimaryColumn()
  id: number;

  @PrimaryColumn()
  sectorId: number;

  @PrimaryColumn()
  characterName: string;

  @Column()
  destinationSectorId: number;

  @Column()
  destinationWarpGateId: number;

  @Column()
  toll: number;

  @Column()
  factionId: string;
}
