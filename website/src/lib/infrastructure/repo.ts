type DataApiResponse<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      message: string;
    };

type DataCharacter = {
  name: string;
  level: number;
  xp: number;
  previousLevelXp?: number | null;
  nextLevelXp: number;
  avatar: string;
  credits: number;
  residualCredits: number;
  skillPoints: number;
  maxMissions: number;
  face1: string;
  face2: string;
  avatarImage?: string;
  skills: DataCharacterSkill[];
};

type DataCharacterSkill = {
  skillId: number;
  characterName: string;
  level: number;
  trainTimeRemaining: number;
  totalTime: number;
  skill: DataSkill;
};

export type DataSkill = {
  id: number;
  name: string;
  type: string;
  class: string;
  subClass: string;
  faction: string;
  icon: string;
  basePrice: number;
  skillPoints: number;
  skillLevel: number;
  effect: string;
  trainTime: number;
  maxLevel: number;
  genLevel: number;
  description: string;
  skillImage?: string;
};

export type DataStation = {
  id: number;
  sectorId: number;
  characterName: string;
  name: string;
  type: string;
  owner: string;
  faction: string;
  materials: string;
  level: number;
  icon: string;
  maxHp: number;
  dockFee: number;
};

export type DataSector = {
  id: number;
  characterName: string;
  name: string;
  level: number;
  faction: string;
  isExplored: boolean;
  energy: number;
  population: number;
  habitation: number;
  farming: number;
  economy: number;
  production: number;
  defense: number;
  environment: number;
  wormholeType: string | null;
  eventType: string | null;
};

export type DataSkillAvailableAtStation = {
  sectors: DataSector[];
  stations: DataStation[];
  skill: DataSkill;
  character: DataCharacter;
};

export type DataItem = {
  id: number;
  name: string;
  type: string;
  class: string;
  subClass: string;
  image: string;
  baseSize: number;
  basePrice: number;
  prefabId: number;
  level: number;
  model: string;
  isStackable: boolean;
  description: string;
  refine?: string;
  maxValue?: number;
  baseHarvest?: number;
  canGrow?: boolean;
  growRate?: number;
  growValue?: number;
  harvestItems?: string;
  categoryType?: string;
  bonusMultiplier?: number;
  range?: number;
  speed?: number;
  hp?: number;
  energy?: number;
  specials?: string;
  cargoMax?: number;
  special?: string;
  recipe?: string;
  quantity?: number;
  impactDamage?: number;
  energyDamage?: number;
  explosiveDamage?: number;
  itemImage?: string;
};

export type DataItemAvailableAtStation = {
  sectors: DataSector[];
  stations: DataStation[];
  item: DataItem;
  character: DataCharacter;
};

export type DataWarpGate = {
  id: number;
  sectorId: number;
  characterName: string;
  destinationSectorId: number;
  destinationSectorName: string;
  destinationWarpGateId: number;
  tool: number;
  factionId: string;
};

export type DataSectorResource = {
  id: number;
  sectorId: number;
  characterName: string;
  resourceId: number;
  xPosition: number;
  yPosition: number;
  zPosition: number;
  numberOfResources?: number;
  minimumSize?: number;
  maximumSize?: number;
  spreadDistance?: number;
  maxValue?: number;
  currentValue?: number;
};

export type DataSectorDetails = {
  sector: DataSector;
  stations: DataStation[];
  warpGates: DataWarpGate[];
  availableItems: DataItemAvailableAtStation[];
  availableSkills: DataSkillAvailableAtStation[];
  availableResources: DataSectorResource[];
  skills: DataSkill[];
  items: DataItem[];
};

const baseUrl = 'http://localhost:3000';

async function makeRequest<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);
  return await response.json();
}

export class SkillRepo {
  static async getAll() {
    const response = await makeRequest<DataApiResponse<DataSkill[]>>(`${baseUrl}/skills`);

    if (!response.success) {
      throw new Error(response.message);
    }

    return response.data;
  }

  static async getById(skillId: string | number): Promise<DataSkill> {
    const response = await makeRequest<DataApiResponse<DataSkill>>(`${baseUrl}/skills/${skillId}`);

    if (!response.success) {
      throw new Error(response.message);
    }

    return {
      ...response.data,
      skillImage: await this.getIcon(skillId)
    };
  }

  static async getIcon(skillId: string | number) {
    const response = await makeRequest<DataApiResponse<string>>(
      `${baseUrl}/skills/${skillId}/icon`
    );

    if (!response.success) {
      throw new Error(response.message);
    }

    return response.data;
  }
}

export class ItemRepo {
  static async getAll() {
    const response = await makeRequest<DataApiResponse<DataItem[]>>(`${baseUrl}/items`);

    if (!response.success) {
      throw new Error(response.message);
    }

    return response.data;
  }

  static async getById(itemId: string | number): Promise<DataItem> {
    const response = await makeRequest<DataApiResponse<DataItem>>(`${baseUrl}/items/${itemId}`);

    if (!response.success) {
      throw new Error(response.message);
    }

    return {
      ...response.data,
      itemImage: await this.getIcon(itemId)
    };
  }

  static async getIcon(itemId: string | number) {
    const response = await makeRequest<DataApiResponse<string>>(`${baseUrl}/items/${itemId}/icon`);

    if (!response.success) {
      throw new Error(response.message);
    }

    return response.data;
  }
}

export class CharacterRepo {
  static async getAll() {
    const charactersResponse = await makeRequest<DataApiResponse<DataCharacter[]>>(
      `${baseUrl}/characters`
    );

    if (!charactersResponse.success) {
      throw new Error(charactersResponse.message);
    }

    return await Promise.all(
      charactersResponse.data.map(async (character) => {
        const encodedAvatar = await this.getAvatar(character.name);
        return {
          ...character,
          avatarImage: encodedAvatar
        };
      })
    );
  }

  static async getByName(characterName: string) {
    const response = await makeRequest<DataApiResponse<DataCharacter>>(
      `${baseUrl}/characters/${characterName}`
    );
    if (!response.success) {
      throw new Error(response.message);
    }

    const encodedAvatar = await this.getAvatar(characterName);
    return {
      ...response.data,
      avatarImage: encodedAvatar
    };
  }

  static async getAvatar(characterName: string) {
    const response = await makeRequest<DataApiResponse<string>>(
      `${baseUrl}/characters/${characterName}/avatar`
    );

    if (!response.success) {
      throw new Error(response.message);
    }

    return response.data;
  }

  static async getSkill(characterName: string, skillId: number) {
    const character = await this.getByName(characterName);
    const skill = character.skills.find((skill) => skill.skillId === skillId);
    if (!skill) {
      return undefined;
    }

    skill.skill.skillImage = await SkillRepo.getIcon(skillId);
    return skill;
  }

  static async getStationsForSkill(characterName: string, skillId: number) {
    const response = await makeRequest<DataApiResponse<DataSkillAvailableAtStation>>(
      `${baseUrl}/characters/${characterName}/skills/${skillId}/stations`
    );

    if (!response.success) {
      throw new Error(response.message);
    }

    return response.data;
  }

  static async getStationsForItem(characterName: string, itemId: number) {
    const response = await makeRequest<DataApiResponse<DataItemAvailableAtStation>>(
      `${baseUrl}/characters/${characterName}/items/${itemId}/stations`
    );

    if (!response.success) {
      throw new Error(response.message);
    }

    return response.data;
  }

  static async getSectors(characterName: string) {
    const response = await makeRequest<DataApiResponse<DataSector[]>>(
      `${baseUrl}/characters/${characterName}/sectors`
    );

    if (!response.success) {
      throw new Error(response.message);
    }

    return response.data;
  }

  static async getRoute(characterName: string, fromSectorId: number, toSectorId: number) {
    const response = await makeRequest<DataApiResponse<DataSector[]>>(
      `${baseUrl}/characters/${characterName}/compute-route/${fromSectorId}/to/${toSectorId}`
    );

    if (!response.success) {
      throw new Error(response.message);
    }

    return response.data;
  }

  static async getSectorDetails(characterName: string, sectorId: number) {
    const response = await makeRequest<DataApiResponse<DataSectorDetails>>(
      `${baseUrl}/characters/${characterName}/sectors/${sectorId}`
    );

    if (!response.success) {
      throw new Error(response.message);
    }

    return response.data;
  }
}

export class SettingsRepo {
  static async getDataDirectory() {
    const response = await makeRequest<DataApiResponse<{ value: string }>>(
      `${baseUrl}/system/game-data-directory`
    );

    if (!response.success) {
      return '';
      // throw new Error(response.message);
    }

    return response.data.value;
  }

  static async setDataDirectory(directoryPath: string) {
    const response = await makeRequest<DataApiResponse<void>>(
      `${baseUrl}/system/game-data-directory`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ value: directoryPath })
      }
    );

    if (!response.success) {
      throw new Error(response.message);
    }
  }

  static async refreshAllData() {
    const response = await makeRequest<DataApiResponse<void>>(`${baseUrl}/system/import-data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: '{}'
    });

    if (!response.success) {
      throw new Error(response.message);
    }
  }
}
