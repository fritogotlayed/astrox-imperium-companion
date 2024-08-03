import { SkillRepo } from '$lib/infrastructure/repo';
import { redirect } from '@sveltejs/kit';

export async function load({ params, url }) {
  let skills = await SkillRepo.getAll();

  // Get filter param from query string
  const urlSearchParams = new URLSearchParams(url.search);
  const skillFilter = urlSearchParams.get('skillFilter');

  if (skillFilter) {
    skills = skills.filter((skill) => skill.name.toLowerCase().includes(skillFilter.toLowerCase()));
  }

  // alphabetize by name
  skills.sort((a, b) => a.name.localeCompare(b.name));

  return {
    skills,
    characterName: params.id
  };
}

export const actions = {
  filter: async ({ request }) => {
    const formData = await request.formData();
    const skillFilter = formData.get('skillFilter');

    if (!skillFilter) {
      redirect(302, '?');
    }

    redirect(302, `?skillFilter=${skillFilter}`);
  }
};
