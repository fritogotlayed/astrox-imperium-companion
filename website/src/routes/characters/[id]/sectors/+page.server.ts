import { CharacterRepo, type DataSector } from '$lib/infrastructure/repo';

export type PageData = {
  characterId: string;
  sectors: DataSector[];
};

export async function load({ params }): Promise<PageData> {
  const { id: characterId } = params;

  const sectors = await CharacterRepo.getSectors(characterId);

  const sortedSectors = sectors.sort((a, b) => a.name.localeCompare(b.name));

  return {
    characterId,
    sectors
  };
}
