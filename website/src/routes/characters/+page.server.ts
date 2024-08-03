import { CharacterRepo } from '$lib/infrastructure/repo';

export async function load() {
  const characters = await CharacterRepo.getAll();
  return {
    characters
  };
}
