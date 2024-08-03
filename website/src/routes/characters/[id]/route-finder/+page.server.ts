import { CharacterRepo } from '$lib/infrastructure/repo';
import { redirect } from '@sveltejs/kit';

export async function load({ params }) {
  const { id } = params;

  const sectors = await CharacterRepo.getSectors(id);

  const sortedSectors = sectors.sort((a, b) => a.name.localeCompare(b.name));

  return {
    characterName: id,
    sectors: sortedSectors
  };
}

export const actions = {
  findRoute: async ({ request }) => {
    const formData = await request.formData();
    const characterName = formData.get('characterName');
    const fromSector = formData.get('fromSector');
    const toSector = formData.get('toSector');

    redirect(303, `/characters/${characterName}/route-finder/${fromSector}/to/${toSector}`);
  }
};
