import { readFile } from 'node:fs/promises';
import { mapNullStringToNull } from './common';
import { Skill } from '../../core/domain/skill';
import { SkillDependency } from '../../core/domain/skill-dependency';

export async function* loadSkills(baseDirectory: string) {
  const fileData = await readFile(
    `${baseDirectory}/skills/skills_database.txt`,
  );

  for (const line of fileData.toString().split('\n')) {
    if (line.startsWith('SKILL;')) {
      const parts = line.split(';').map((e) => e.trim());
      const skillId = parseInt(parts[1], 10);
      const skill: Skill = new Skill();
      skill.id = skillId;
      skill.name = mapNullStringToNull(parts[2]);
      skill.type = mapNullStringToNull(parts[3]);
      skill.class = mapNullStringToNull(parts[4]);
      skill.subClass = mapNullStringToNull(parts[5]);
      skill.faction = mapNullStringToNull(parts[6]);
      skill.icon = mapNullStringToNull(parts[7]);
      skill.basePrice = parseFloat(parts[8]);
      skill.skillPoints = !parts[9] ? null : parseFloat(parts[9]);
      skill.skillLevel = !parts[10] ? null : parseFloat(parts[10]);
      skill.effect = mapNullStringToNull(parts[11]);
      skill.effectValue = !parts[12] ? null : parseFloat(parts[12]);
      skill.trainTime = !parts[13] ? null : parseFloat(parts[13]);
      skill.maxLevel = !parts[15] ? null : parseFloat(parts[15]);
      skill.genLevel = !parts[16] ? null : parseFloat(parts[16]);
      skill.description = mapNullStringToNull(parts[22]);

      yield skill;

      const [dependsOn, level] = parts[14].split(',');
      if (dependsOn !== '0') {
        const dep = new SkillDependency();
        dep.skillId = skillId;
        dep.dependsOn = parseFloat(dependsOn);
        dep.level = parseFloat(level);
        yield dep;
      }
    }
  }
}
