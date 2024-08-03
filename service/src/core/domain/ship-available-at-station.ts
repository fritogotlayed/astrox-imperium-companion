import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class ShipAvailableAtStation {
  @PrimaryColumn()
  characterName: string;

  @PrimaryColumn()
  sectorId: number;

  @PrimaryColumn()
  stationId: number;

  @PrimaryColumn()
  shipId: string;

  @Column({ type: 'float' })
  priceModifier: number;
}
