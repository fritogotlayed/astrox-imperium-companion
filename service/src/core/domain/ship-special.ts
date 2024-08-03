import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class ShipSpecial {
  @PrimaryColumn()
  shipId: string;

  @PrimaryColumn()
  label: string;

  @Column({ type: 'float' })
  value: number;
}
