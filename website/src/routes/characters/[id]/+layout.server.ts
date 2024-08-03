import { CharacterRepo } from '$lib/infrastructure/repo';

export async function load({ params }) {
  const { id } = params;
  const characters = await CharacterRepo.getAll();

  return {
    characters,
    selectedCharacterId: id
  };
}
