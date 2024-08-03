import { ItemRepo } from '$lib/infrastructure/repo';
import { redirect } from '@sveltejs/kit';

export async function load({ params, url }) {
  let items = await ItemRepo.getAll();

  // Get filter param from query string
  const urlSearchParams = new URLSearchParams(url.search);
  const itemFilter = urlSearchParams.get('itemFilter');

  if (itemFilter) {
    items = items.filter((item) => item.name.toLowerCase().includes(itemFilter.toLowerCase()));
  }

  // alphabetize by name
  items.sort((a, b) => a.name.localeCompare(b.name));

  return {
    items,
    characterName: params.id
  };
}

export const actions = {
  filter: async ({ request }) => {
    const formData = await request.formData();
    const itemFilter = formData.get('itemFilter');

    if (!itemFilter) {
      redirect(302, '?');
    }

    redirect(302, `?itemFilter=${itemFilter}`);
  }
};
