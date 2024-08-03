import { CharacterRepo } from '$lib/infrastructure/repo';

export async function load({ params }) {
  const { id, sectorId } = params;

  const sectorDetails = await CharacterRepo.getSectorDetails(id, Number(sectorId));

  return {
    selectedCharacterId: id,
    selectedSectorId: sectorId,
    sectorDetails: sectorDetails
  };
}
