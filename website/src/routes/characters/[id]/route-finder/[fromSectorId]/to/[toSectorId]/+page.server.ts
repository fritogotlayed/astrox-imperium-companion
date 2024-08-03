import { CharacterRepo } from '$lib/infrastructure/repo';

export async function load({ params }) {
  const { id, fromSectorId, toSectorId } = params;

  const route = await CharacterRepo.getRoute(id, Number(fromSectorId), Number(toSectorId));

  return {
    id,
    fromSectorId,
    toSectorId,
    route
  };
}
