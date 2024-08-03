import { readdir, readFile } from 'node:fs/promises';
import { Dirent } from 'node:fs';
import { Ship } from '../../core/domain/ship';
import { ShipSpecial } from '../../core/domain/ship-special';

export async function* loadShips(baseDirectory: string) {
  const directory = `${baseDirectory}/ships`;
  const entities = (await readdir(directory, {
    withFileTypes: true,
  })) as Dirent[];

  for (const entity of entities) {
    if (entity.isFile() && entity.name.endsWith('.txt')) {
      const fileData = await readFile(`${directory}/${entity.name}`);

      const ship = new Ship();
      const shipSpecials: ShipSpecial[] = [];
      for (const line of fileData.toString().split('\n')) {
        line.startsWith('SHIP_base_level;') &&
          (ship.baseLevel = parseFloat(line.split(';')[1].trim()));
        line.startsWith('SHIP_skill_level;') &&
          (ship.skillLevel = parseFloat(line.split(';')[1].trim()));
        line.startsWith('SHIP_filename;') &&
          (ship.id = line.split(';')[1].trim());
        line.startsWith('SHIP_faction_id;') &&
          (ship.factionId = parseFloat(line.split(';')[1].trim()));
        line.startsWith('SHIP_name;') &&
          (ship.name = line.split(';')[1].trim());
        line.startsWith('SHIP_class;') &&
          (ship.class = line.split(';')[1].trim());
        line.startsWith('SHIP_base_shield;') &&
          (ship.baseShield = parseFloat(line.split(';')[1].trim()));
        line.startsWith('SHIP_base_armor;') &&
          (ship.baseArmor = parseFloat(line.split(';')[1].trim()));
        line.startsWith('SHIP_base_energy;') &&
          (ship.baseEnergy = parseFloat(line.split(';')[1].trim()));
        line.startsWith('SHIP_base_cargo;') &&
          (ship.baseCargo = parseFloat(line.split(';')[1].trim()));
        line.startsWith('SHIP_base_speed;') &&
          (ship.baseSpeed = parseFloat(line.split(';')[1].trim()));
        line.startsWith('SHIP_base_turn;') &&
          (ship.baseTurn = parseFloat(line.split(';')[1].trim()));
        line.startsWith('SHIP_base_thrust;') &&
          (ship.baseThrust = parseFloat(line.split(';')[1].trim()));
        line.startsWith('SHIP_base_mass;') &&
          (ship.baseMass = parseFloat(line.split(';')[1].trim()));
        line.startsWith('SHIP_active_slots;') &&
          (ship.activeSlots = parseFloat(line.split(';')[1].trim()));
        line.startsWith('SHIP_passive_slots;') &&
          (ship.passiveSlots = parseFloat(line.split(';')[1].trim()));
        line.startsWith('SHIP_base_lifesupport;') &&
          (ship.baseLifeSupport = parseFloat(line.split(';')[1].trim()));
        line.startsWith('SHIP_base_engine_burn;') &&
          (ship.baseEngineBurn = parseFloat(line.split(';')[1].trim()));
        line.startsWith('SHIP_base_recharge;') &&
          (ship.baseRecharge = parseFloat(line.split(';')[1].trim()));
        line.startsWith('SHIP_base_shield_recharge;') &&
          (ship.baseShieldRecharge = parseFloat(line.split(';')[1].trim()));
        line.startsWith('SHIP_base_scan_speed;') &&
          (ship.baseScanSpeed = parseFloat(line.split(';')[1].trim()));
        line.startsWith('SHIP_base_scan_max_targets;') &&
          (ship.baseScanMaxTargets = parseFloat(line.split(';')[1].trim()));
        line.startsWith('SHIP_base_scan_pulserange;') &&
          (ship.baseScanPulseRange = parseFloat(line.split(';')[1].trim()));
        line.startsWith('SHIP_base_scan_pulsespeed;') &&
          (ship.baseScanPulseSpeed = parseFloat(line.split(';')[1].trim()));
        line.startsWith('SHIP_type;') &&
          (ship.type = line.split(';')[1].trim());
        line.startsWith('SHIP_base_price;') &&
          (ship.basePrice = parseFloat(line.split(';')[1].trim()));
        line.startsWith('SHIP_description;') &&
          (ship.description = line.split(';')[1].trim());
        line.startsWith('SHIP_impact_resistance;') &&
          (ship.impactResistance = parseFloat(line.split(';')[1].trim()));
        line.startsWith('SHIP_energy_resistance;') &&
          (ship.energyResistance = parseFloat(line.split(';')[1].trim()));
        line.startsWith('SHIP_explosive_resistance;') &&
          (ship.explosiveResistance = parseFloat(line.split(';')[1].trim()));
        line.startsWith('SHIP_manufacturer;') &&
          (ship.manufacturer = line.split(';')[1].trim());
        line.startsWith('SHIP_manufacturer_icon;') &&
          (ship.manufacturerIcon = line.split(';')[1].trim());
        line.startsWith('SHIP_base_drones;') &&
          (ship.baseDrones = parseFloat(line.split(';')[1].trim()));

        if (line.startsWith('SHIP_specials_raw;')) {
          const parts = line.split(';')[1].trim().split(',');
          for (const pair of parts) {
            if (pair) {
              const [label, value] = pair.split('#');
              const shipSpecial = new ShipSpecial();
              shipSpecial.shipId = ship.id;
              shipSpecial.label = label;
              shipSpecial.value = parseFloat(value);
              shipSpecials.push(shipSpecial);
            }
          }
        }
      }

      if (ship) {
        yield ship;
        for (const shipSpecial of shipSpecials) {
          yield shipSpecial;
        }
      }
    }
  }
}
