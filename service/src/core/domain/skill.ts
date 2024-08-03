import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Skill {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  class: string;

  @Column({ nullable: true })
  subClass?: string | null;

  @Column()
  faction: string;

  @Column()
  icon: string;

  @Column()
  basePrice: number;

  @Column()
  skillPoints: number;

  @Column()
  skillLevel: number;

  @Column()
  effect: string;

  @Column({ type: 'float' })
  effectValue: number;

  @Column()
  trainTime: number;

  @Column()
  maxLevel: number;

  @Column()
  genLevel: number;

  @Column()
  description: string;
}
