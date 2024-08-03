import { SettingsRepo } from '$lib/infrastructure/repo';

export async function load() {
  const dataDir = await SettingsRepo.getDataDirectory();
  return {
    modDirectory: dataDir
  };
}

export const actions = {
  setModPath: async ({ request }) => {
    const formData = await request.formData();
    const modPath = formData.get('modPath');

    if (!modPath) {
      throw new Error('Mod path is required');
    }

    await SettingsRepo.setDataDirectory(modPath.toString());
  },

  refreshAllData: async () => {
    await SettingsRepo.refreshAllData();
  }
};
