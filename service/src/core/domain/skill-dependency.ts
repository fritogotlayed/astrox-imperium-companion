import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'skill_dependencies',
})
export class SkillDependency {
  @PrimaryColumn()
  skillId: number;

  @PrimaryColumn()
  dependsOn: number;

  @Column()
  level: number;
}
