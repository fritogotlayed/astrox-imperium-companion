import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Sector {
  @PrimaryColumn()
  id: number;

  @PrimaryColumn()
  characterName: string;

  @Column()
  name: string;

  @Column({ type: 'float' })
  level: number;

  @Column()
  faction: string;

  @Column()
  isExplored: boolean;

  @Column()
  energy: number;

  @Column()
  population: number;

  @Column()
  habitation: number;

  @Column()
  farming: number;

  @Column()
  economy: number;

  @Column()
  production: number;

  @Column()
  defence: number;

  @Column()
  environment: number;

  @Column({
    nullable: true,
  })
  wormholeType?: string | null;

  @Column({
    nullable: true,
  })
  eventType?: string | null;
}
