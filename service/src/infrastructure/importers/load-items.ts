import { readFile } from 'node:fs/promises';
import { ActiveModule } from '../../core/domain/active-module';
import { PassiveModule } from '../../core/domain/passive-module';
import { Item, MarketItem } from '../../core/domain/item';
import { Module } from '../../core/domain/module';
import { Resource } from '../../core/domain/resource';
import { Ammunition } from '../../core/domain/ammunition';
import { LifeSupport } from '../../core/domain/life-support';
import { Drone } from '../../core/domain/drone';
import { Material } from '../../core/domain/material';
import { Component } from '../../core/domain/component';
import { TradeGood } from '../../core/domain/trade-good';
import { Document } from '../../core/domain/document';

function mapCommonItemFields(item: Item, parts: string[]) {
  item.id = parseInt(parts[1], 10);
  item.name = parts[2];
  item.type = parts[3];
  item.class = parts[4];
  item.subClass = parts[5];
  item.image = parts[6];
  item.baseSize = parseFloat(parts[7]);
  item.basePrice = parseFloat(parts[8]);
  item.description = parts[22];
}

function mapCommonModuleFields(module: Module, parts: string[]) {
  mapCommonItemFields(module, parts);
  module.specialAbilities = parts[21];
}

function mapCommonMarketItemFields(item: MarketItem, parts: string[]) {
  mapCommonItemFields(item, parts);
  item.prefabId = parseFloat(parts[9]);
  item.level = parseFloat(parts[10]);
  item.model = parts[11];
  item.isStackable = parts[12].toLowerCase() === 'true';
}

async function* processItemsFile(baseDirectory: string) {
  const fileData = await readFile(`${baseDirectory}/items/items_database.txt`);

  for (const line of fileData.toString().split('\n')) {
    if (line.startsWith('MODULE;')) {
      const parts = line.split(';').map((e) => e.trim());
      const module = new ActiveModule();
      mapCommonModuleFields(module, parts);
      module.prefabId = parseFloat(parts[9]);
      module.level = parseFloat(parts[10]);
      module.ammoPrefabId = parseFloat(parts[11]);
      module.isStackable = parts[12].toLowerCase() === 'true';
      module.cycleRate = parseFloat(parts[13]);
      module.turnSpeed = parseFloat(parts[14]);
      module.maxRange = parseFloat(parts[15]);
      module.mobilityRange = parseFloat(parts[16]);
      module.projectileSpeed = parseFloat(parts[17]);
      module.energyUsage = parseFloat(parts[18]);
      module.durabilityPoints = parseFloat(parts[19]);
      module.baseDamage = parseFloat(parts[20]);
      yield module;
    } else if (line.startsWith('PMODULE;')) {
      const parts = line.split(';').map((e) => e.trim());
      const module = new PassiveModule();
      mapCommonModuleFields(module, parts);
      module.level = parseFloat(parts[10]);
      module.isStackable = parts[12].toLowerCase() === 'true';
      module.specialType = parts[13];
      module.specialMode = parts[14];
      module.specialValue = parseFloat(parts[15]);
      yield module;
    } else if (line.startsWith('ITEM;')) {
      const parts = line.split(';').map((e) => e.trim());
      const type = parts[3];
      const itemSubClass = parts[5];

      if (type === 'Resource') {
        const resource = new Resource();
        mapCommonMarketItemFields(resource, parts);
        resource.refine = parts[13];
        resource.maxValue = parseFloat(parts[14]);
        resource.baseHarvest = parseFloat(parts[15]);
        resource.canGrow = parts[16].toLowerCase() === 'true';
        resource.growRate = parseFloat(parts[17]);
        resource.growValue = parseFloat(parts[18]);
        resource.harvestItems = parts[19];
        resource.categoryType = parts[20];
        yield resource;
      } else if (type === 'Ammo') {
        const ammo = new Ammunition();
        mapCommonMarketItemFields(ammo, parts);
        ammo.impactDamage = parseFloat(parts[13]);
        ammo.energyDamage = parseFloat(parts[14]);
        ammo.explosiveDamage = parseFloat(parts[15]);
        yield ammo;
      } else if (type === 'Material') {
        const material = new Material();
        mapCommonMarketItemFields(material, parts);
        yield material;
      } else if (type === 'Component') {
        const component = new Component();
        mapCommonMarketItemFields(component, parts);
        yield component;
      } else if (type === 'Trade Good') {
        const tradeGood = new TradeGood();
        mapCommonMarketItemFields(tradeGood, parts);
        yield tradeGood;
      } else if (type === 'Support') {
        if (itemSubClass === 'Base') {
          const lifeSupport = new LifeSupport();
          mapCommonMarketItemFields(lifeSupport, parts);
          lifeSupport.bonusMultiplier = parseFloat(parts[13]);
          yield lifeSupport;
        } else if (itemSubClass === 'Drone') {
          const drone = new Drone();
          mapCommonMarketItemFields(drone, parts);
          drone.range = parseFloat(parts[15]);
          drone.speed = parseFloat(parts[16]);
          drone.hp = parseFloat(parts[17]);
          drone.energy = parseFloat(parts[18]);
          drone.specials = parts[19];
          drone.cargoMax = parseFloat(parts[20]);
          drone.special = parts[21];
          yield drone;
        } else {
          // TODO: Boost, Bomb, Structure, Skillpoints
          // NOTE: These have undocumented values at indexes 14 through 18. YOLO-ing it for now.
          const lifeSupport = new LifeSupport();
          mapCommonMarketItemFields(lifeSupport, parts);
          lifeSupport.bonusMultiplier = parseFloat(parts[13]);
          yield lifeSupport;
        }
      }
    }
  }
}

async function* processSpecsFile(baseDirectory: string) {
  const fileData = await readFile(`${baseDirectory}/items/specs_database.txt`);

  for (const line of fileData.toString().split('\n')) {
    if (line.startsWith('ITEM;')) {
      const parts = line.split(';').map((e) => e.trim());
      const document = new Document();
      mapCommonMarketItemFields(document, parts);
      document.recipe = parts[13];
      document.quantity = parseFloat(parts[14]);
      yield document;
    }
  }
}

export async function* loadItems(baseDirectory: string) {
  yield* processItemsFile(baseDirectory);
  yield* processSpecsFile(baseDirectory);
}
