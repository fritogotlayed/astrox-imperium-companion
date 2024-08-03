import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { LearnedSkill } from './learned-skill';

@Entity()
export class Character {
  @PrimaryColumn({
    nullable: false,
  })
  name: string;

  @Column()
  level: number;

  @Column()
  xp: number;

  @Column({
    nullable: true,
  })
  previousLevelXp?: number | null;

  @Column()
  nextLevelXp: number;

  @Column()
  avatar: string;

  @Column()
  credits: number;

  @Column()
  residualCredits: number;

  @Column()
  skillPoints: number;

  @Column()
  playtime: number;

  @Column()
  maxMissions: number;

  @Column()
  face1: string;

  @Column()
  face2: string;

  @Column()
  currentSectorId: number;

  @OneToMany(() => LearnedSkill, (learnedSkill) => learnedSkill.character, {
    cascade: false,
    eager: false,
  })
  skills: LearnedSkill[];
}
