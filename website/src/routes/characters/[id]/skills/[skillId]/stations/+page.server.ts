import { CharacterRepo, type DataStation } from '$lib/infrastructure/repo';

export async function load({ params }) {
  const data = await CharacterRepo.getStationsForSkill(params.id, Number(params.skillId));

  // Create a lookup table for stations by sector
  const sectorStationLookup: Record<number, DataStation[]> = {};
  data.stations.forEach((station) => {
    if (!sectorStationLookup[station.sectorId]) {
      sectorStationLookup[station.sectorId] = [];
    }

    sectorStationLookup[station.sectorId].push(station);
  });

  const sortedSectors = data.sectors.sort((a, b) => a.name.localeCompare(b.name));

  return { ...data, sectorStationLookup, sectors: sortedSectors };
}
