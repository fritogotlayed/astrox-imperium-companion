import { CharacterRepo } from '$lib/infrastructure/repo';

export async function load({ params }) {
  return await CharacterRepo.getByName(params.id);
}
