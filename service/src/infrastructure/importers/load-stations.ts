import { readdir, readFile } from 'node:fs/promises';
import { Station } from '../../core/domain/station';
import { ItemAvailableAtStation } from '../../core/domain/item-available-at-station';
import { SkillAvailableAtStation } from '../../core/domain/skill-available-at-station';
import { ShipAvailableAtStation } from '../../core/domain/ship-available-at-station';

export async function* loadStationForCharacter(
  baseDirectory: string,
  characterName: string,
  fileName: string,
) {
  const fileData = await readFile(`${baseDirectory}/stations/${fileName}`);

  // in the string "sector_0_station_1.txt", the sector_id is 0
  const [_, sectorIdStr, __, stationIdStr] = fileName
    .replace('.txt', '')
    .split('_');
  const sectorId = parseInt(sectorIdStr, 10);
  const id = parseInt(stationIdStr, 10);

  const itemsAvailableAtStation: ItemAvailableAtStation[] = [];
  const skillsAvailableAtStation: SkillAvailableAtStation[] = [];
  const shipsAvailableAtStation: ShipAvailableAtStation[] = [];

  const station = new Station();
  station.characterName = characterName;
  station.id = id;
  station.sectorId = sectorId;
  for (const line of fileData.toString().split('\n')) {
    line.startsWith('STATION;name;') &&
      (station.name = line.split(';')[2].trim());
    line.startsWith('STATION;type;') &&
      (station.type = line.split(';')[2].trim());
    line.startsWith('STATION;owner;') &&
      (station.owner = line.split(';')[2].trim());
    line.startsWith('STATION;faction;') &&
      (station.faction = line.split(';')[2].trim());
    line.startsWith('STATION;material;') &&
      (station.material = line.split(';')[2].trim());
    line.startsWith('STATION;level;') &&
      (station.level = parseInt(line.split(';')[2].trim(), 10));
    line.startsWith('STATION;icon;') &&
      (station.icon = line.split(';')[2].trim());
    line.startsWith('STATION;max_hp;') &&
      (station.maxHp = parseInt(line.split(';')[2].trim(), 10));
    line.startsWith('STATION;dockfee;') &&
      (station.dockFee = parseInt(line.split(';')[2].trim(), 10));

    if (line.startsWith('ITEM;')) {
      const parts = line.split(';').map((e) => e.trim());
      const itemAvailableAtStation = new ItemAvailableAtStation();
      itemAvailableAtStation.itemId = parseInt(parts[1], 10);
      itemAvailableAtStation.stationId = id;
      itemAvailableAtStation.sectorId = sectorId;
      itemAvailableAtStation.characterName = characterName;
      itemAvailableAtStation.quantity = parseInt(parts[2], 10);
      itemsAvailableAtStation.push(itemAvailableAtStation);
    }
    if (line.startsWith('SKILL;')) {
      const parts = line.split(';').map((e) => e.trim());
      const skillAvailableAtStation = new SkillAvailableAtStation();
      skillAvailableAtStation.skillId = parseInt(parts[1], 10);
      skillAvailableAtStation.stationId = id;
      skillAvailableAtStation.sectorId = sectorId;
      skillAvailableAtStation.characterName = characterName;
      skillAvailableAtStation.priceModifier = parseFloat(parts[2]);
      skillsAvailableAtStation.push(skillAvailableAtStation);
    }
    if (line.startsWith('SHIP;')) {
      const parts = line.split(';').map((e) => e.trim());
      const shipAvailableAtStation = new ShipAvailableAtStation();
      shipAvailableAtStation.shipId = parts[3].replace('.txt', '');
      shipAvailableAtStation.stationId = id;
      shipAvailableAtStation.sectorId = sectorId;
      shipAvailableAtStation.characterName = characterName;
      shipAvailableAtStation.priceModifier = parseFloat(parts[2]);
      shipsAvailableAtStation.push(shipAvailableAtStation);
    }
  }
  yield station;
  for (const itemAvailableAtStation of itemsAvailableAtStation) {
    yield itemAvailableAtStation;
  }
  for (const skillAvailableAtStation of skillsAvailableAtStation) {
    yield skillAvailableAtStation;
  }
  for (const shipAvailableAtStation of shipsAvailableAtStation) {
    yield shipAvailableAtStation;
  }
}

export async function* loadStationsForCharacter(
  baseDirectory: string,
  characterName: string,
) {
  const entities = await readdir(
    `${baseDirectory}/saves/${characterName}/stations`,
    {
      withFileTypes: true,
    },
  );

  for (const entity of entities) {
    if (entity.isFile() && entity.name.endsWith('.txt')) {
      yield* loadStationForCharacter(baseDirectory, characterName, entity.name);
    }
  }
}

export async function* loadStations(baseDirectory: string) {
  const entities = await readdir(`${baseDirectory}/saves`, {
    withFileTypes: true,
  });

  for (const entity of entities) {
    if (entity.isDirectory()) {
      yield* loadStationsForCharacter(baseDirectory, entity.name);
    }
  }
}
