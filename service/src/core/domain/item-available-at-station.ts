import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class ItemAvailableAtStation {
  @PrimaryColumn()
  characterName: string;

  @PrimaryColumn()
  sectorId: number;

  @PrimaryColumn()
  stationId: number;

  @PrimaryColumn()
  itemId: number;

  @Column()
  quantity: number;
}
