import { Character } from '../../core/domain/character';
import { readdir, readFile } from 'node:fs/promises';
import { Dirent } from 'node:fs';
import { LearnedSkill } from '../../core/domain/learned-skill';

export async function* loadCharacter(
  baseDirectory: string,
  characterName: string,
) {
  const directory = `${baseDirectory}/saves/${characterName}`;
  const fileData = await readFile(`${directory}/player_data.txt`);

  const character = new Character();
  const learnedSkills: LearnedSkill[] = [];
  for (const line of fileData.toString().split('\n')) {
    line.startsWith('PLAYER;name;') &&
      (character.name = line.split(';')[2].trim());
    line.startsWith('PLAYER;level;') &&
      (character.level = parseInt(line.split(';')[2].trim()));
    line.startsWith('PLAYER;xp;') &&
      (character.xp = parseInt(line.split(';')[2].trim()));
    line.startsWith('PLAYER;next_level_xp;') &&
      (character.nextLevelXp = parseInt(line.split(';')[2].trim()));
    line.startsWith('PLAYER;avatar;') &&
      (character.avatar = line.split(';')[2].trim());
    line.startsWith('PLAYER;credits;') &&
      (character.credits = parseInt(line.split(';')[2].trim()));
    line.startsWith('PLAYER;residual_credits;') &&
      (character.residualCredits = parseInt(line.split(';')[2].trim()));
    line.startsWith('PLAYER;skill_points;') &&
      (character.skillPoints = parseInt(line.split(';')[2].trim()));
    line.startsWith('PLAYER;playtime;') &&
      (character.playtime = parseInt(line.split(';')[2].trim()));
    line.startsWith('PLAYER;max_missions;') &&
      (character.maxMissions = parseInt(line.split(';')[2].trim()));
    line.startsWith('PLAYER;face_1;') &&
      (character.face1 = line.split(';')[2].trim());
    line.startsWith('PLAYER;face_2;') &&
      (character.face2 = line.split(';')[2].trim());
    line.startsWith('PLAYER;sector_id;') &&
      (character.currentSectorId = parseInt(line.split(';')[2].trim(), 10));
    if (line.startsWith('SKILL;')) {
      const parts = line.split(';').map((e) => e.trim());
      const learnedSkill = new LearnedSkill();
      learnedSkill.characterName = characterName;
      learnedSkill.skillId = parseInt(parts[1], 10);
      learnedSkill.level = parseFloat(parts[2]);
      learnedSkill.trainTimeRemaining = parseFloat(parts[3]);
      learnedSkill.totalTime = parseFloat(parts[4]);
      learnedSkills.push(learnedSkill);
    }
  }
  yield character;
  for (const learnedSkill of learnedSkills) {
    yield learnedSkill;
  }
}

export async function* loadCharacters(baseDirectory: string) {
  const directory = `${baseDirectory}/saves`;
  const entities = (await readdir(directory, {
    withFileTypes: true,
  })) as Dirent[];

  for (const entity of entities) {
    if (entity.isDirectory()) {
      yield* loadCharacter(baseDirectory, entity.name);
    }
  }
}
