/* Partial to help with code below */
import { CharacterRepo, type DataSkill, SkillRepo } from '$lib/infrastructure/repo';

export async function load({ params }) {
  const characterSkill = await CharacterRepo.getSkill(params.id, Number(params.skillId));
  let skill: DataSkill | undefined = characterSkill?.skill;

  if (!skill) {
    console.log(`Skill not found, fetching from API: ${params.skillId}`);
    skill = await SkillRepo.getById(Number(params.skillId));
  }

  const data: {
    characterId: string;
    characterSkillLevel: number | undefined;
    skill: DataSkill;
  } = {
    characterId: params.id,
    characterSkillLevel: characterSkill?.level ?? 0,
    skill
  };

  return data;
}
