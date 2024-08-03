import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Station {
  @PrimaryColumn()
  id: number;

  @PrimaryColumn()
  sectorId: number;

  @PrimaryColumn()
  characterName: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  owner: string;

  @Column()
  faction: string;

  @Column()
  material: string;

  @Column()
  level: number;

  @Column()
  icon: string;

  @Column()
  maxHp: number;

  @Column()
  dockFee: number;
}
