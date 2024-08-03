import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Character } from './character';
import { Skill } from './skill';

@Entity()
export class LearnedSkill {
  @PrimaryColumn()
  characterName: string;

  @PrimaryColumn()
  skillId: number;

  @Column()
  level: number;

  @Column()
  trainTimeRemaining: number;

  @Column()
  totalTime: number;

  @ManyToOne(() => Character, {
    cascade: false,
    eager: false,
  })
  character: Character;

  @ManyToOne(() => Skill, {
    cascade: false,
    eager: false,
  })
  skill: Skill;
}
