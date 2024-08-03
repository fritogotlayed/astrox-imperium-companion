import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1723120413469 implements MigrationInterface {
    name = 'Initial1723120413469'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "warp_gates" ("id" integer NOT NULL, "sector_id" integer NOT NULL, "character_name" varchar NOT NULL, "destination_sector_id" integer NOT NULL, "destination_warp_gate_id" integer NOT NULL, "toll" integer NOT NULL, "faction_id" varchar NOT NULL, PRIMARY KEY ("id", "sector_id", "character_name"))`);
        await queryRunner.query(`CREATE TABLE "items" ("id" integer PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "type" varchar NOT NULL, "class" varchar NOT NULL, "sub_class" varchar NOT NULL, "image" varchar NOT NULL, "base_size" float NOT NULL, "base_price" float NOT NULL, "level" integer NOT NULL, "is_stackable" boolean NOT NULL, "description" varchar NOT NULL, "prefab_id" integer, "model" varchar, "refine" varchar, "max_value" integer, "base_harvest" integer, "can_grow" boolean, "grow_rate" integer, "grow_value" integer, "harvest_items" varchar, "category_type" varchar, "special_abilities" varchar, "special_type" varchar, "special_mode" varchar, "special_value" float, "bonus_multiplier" float, "range" integer, "speed" integer, "hp" integer, "energy" integer, "specials" varchar, "cargo_max" integer, "special" varchar, "recipe" varchar, "quantity" integer, "impact_damage" float, "energy_damage" float, "explosive_damage" float, "ammo_prefab_id" integer, "cycle_rate" float, "turn_speed" float, "max_range" float, "mobility_range" float, "projectile_speed" float, "energy_usage" float, "durability_points" float, "base_damage" float, "entity_type" varchar NOT NULL)`);
        await queryRunner.query(`CREATE INDEX "items_entity_type_idx" ON "items" ("entity_type") `);
        await queryRunner.query(`CREATE TABLE "skills" ("id" integer PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "type" varchar NOT NULL, "class" varchar NOT NULL, "sub_class" varchar, "faction" varchar NOT NULL, "icon" varchar NOT NULL, "base_price" integer NOT NULL, "skill_points" integer NOT NULL, "skill_level" integer NOT NULL, "effect" varchar NOT NULL, "effect_value" float NOT NULL, "train_time" integer NOT NULL, "max_level" integer NOT NULL, "gen_level" integer NOT NULL, "description" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "stations" ("id" integer NOT NULL, "sector_id" integer NOT NULL, "character_name" varchar NOT NULL, "name" varchar NOT NULL, "type" varchar NOT NULL, "owner" varchar NOT NULL, "faction" varchar NOT NULL, "material" varchar NOT NULL, "level" integer NOT NULL, "icon" varchar NOT NULL, "max_hp" integer NOT NULL, "dock_fee" integer NOT NULL, PRIMARY KEY ("id", "sector_id", "character_name"))`);
        await queryRunner.query(`CREATE TABLE "skill_available_at_stations" ("character_name" varchar NOT NULL, "sector_id" integer NOT NULL, "station_id" integer NOT NULL, "skill_id" integer NOT NULL, "price_modifier" float NOT NULL, PRIMARY KEY ("character_name", "sector_id", "station_id", "skill_id"))`);
        await queryRunner.query(`CREATE TABLE "skill_dependencies" ("skill_id" integer NOT NULL, "depends_on" integer NOT NULL, "level" integer NOT NULL, PRIMARY KEY ("skill_id", "depends_on"))`);
        await queryRunner.query(`CREATE TABLE "ship_specials" ("ship_id" varchar NOT NULL, "label" varchar NOT NULL, "value" float NOT NULL, PRIMARY KEY ("ship_id", "label"))`);
        await queryRunner.query(`CREATE TABLE "ships" ("id" varchar PRIMARY KEY NOT NULL, "base_level" integer NOT NULL, "skill_level" integer NOT NULL, "faction_id" integer NOT NULL, "name" varchar NOT NULL, "class" varchar NOT NULL, "base_shield" integer NOT NULL, "base_armor" integer NOT NULL, "base_energy" integer NOT NULL, "base_cargo" integer NOT NULL, "base_speed" integer NOT NULL, "base_turn" float NOT NULL, "base_thrust" integer NOT NULL, "base_mass" integer NOT NULL, "active_slots" integer NOT NULL, "passive_slots" integer NOT NULL, "base_life_support" integer NOT NULL, "base_engine_burn" float NOT NULL, "base_recharge" float NOT NULL, "base_shield_recharge" float NOT NULL, "base_scan_speed" float NOT NULL, "base_scan_max_targets" integer NOT NULL, "base_scan_pulse_range" integer NOT NULL, "base_scan_pulse_speed" integer NOT NULL, "type" varchar NOT NULL, "base_price" integer NOT NULL, "description" varchar NOT NULL, "impact_resistance" float NOT NULL, "energy_resistance" float NOT NULL, "explosive_resistance" float NOT NULL, "manufacturer" varchar NOT NULL, "manufacturer_icon" varchar NOT NULL, "base_drones" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "ship_available_at_stations" ("character_name" varchar NOT NULL, "sector_id" integer NOT NULL, "station_id" integer NOT NULL, "ship_id" varchar NOT NULL, "price_modifier" float NOT NULL, PRIMARY KEY ("character_name", "sector_id", "station_id", "ship_id"))`);
        await queryRunner.query(`CREATE TABLE "sector_resources" ("id" integer NOT NULL, "sector_id" integer NOT NULL, "character_name" varchar NOT NULL, "resource_id" integer NOT NULL, "x_position" float NOT NULL, "y_position" float NOT NULL, "z_position" float NOT NULL, "number_of_resources" integer, "minimum_size" integer, "maximum_size" integer, "spread_distance" integer, "max_value" integer, "current_value" integer, "entity_type" varchar NOT NULL, PRIMARY KEY ("id", "sector_id", "character_name"))`);
        await queryRunner.query(`CREATE INDEX "sector_resources_entity_type_idx" ON "sector_resources" ("entity_type") `);
        await queryRunner.query(`CREATE TABLE "sectors" ("id" integer NOT NULL, "character_name" varchar NOT NULL, "name" varchar NOT NULL, "level" float NOT NULL, "faction" varchar NOT NULL, "is_explored" boolean NOT NULL, "energy" integer NOT NULL, "population" integer NOT NULL, "habitation" integer NOT NULL, "farming" integer NOT NULL, "economy" integer NOT NULL, "production" integer NOT NULL, "defence" integer NOT NULL, "environment" integer NOT NULL, "wormhole_type" varchar, "event_type" varchar, PRIMARY KEY ("id", "character_name"))`);
        await queryRunner.query(`CREATE TABLE "characters" ("name" varchar PRIMARY KEY NOT NULL, "level" integer NOT NULL, "xp" integer NOT NULL, "previous_level_xp" integer, "next_level_xp" integer NOT NULL, "avatar" varchar NOT NULL, "credits" integer NOT NULL, "residual_credits" integer NOT NULL, "skill_points" integer NOT NULL, "playtime" integer NOT NULL, "max_missions" integer NOT NULL, "face1" varchar NOT NULL, "face2" varchar NOT NULL, "current_sector_id" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "learned_skills" ("character_name" varchar NOT NULL, "skill_id" integer NOT NULL, "level" integer NOT NULL, "train_time_remaining" integer NOT NULL, "total_time" integer NOT NULL, PRIMARY KEY ("character_name", "skill_id"))`);
        await queryRunner.query(`CREATE TABLE "item_available_at_stations" ("character_name" varchar NOT NULL, "sector_id" integer NOT NULL, "station_id" integer NOT NULL, "item_id" integer NOT NULL, "quantity" integer NOT NULL, PRIMARY KEY ("character_name", "sector_id", "station_id", "item_id"))`);
        await queryRunner.query(`CREATE TABLE "configurations" ("key" varchar PRIMARY KEY NOT NULL, "value" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_learned_skills" ("character_name" varchar NOT NULL, "skill_id" integer NOT NULL, "level" integer NOT NULL, "train_time_remaining" integer NOT NULL, "total_time" integer NOT NULL, CONSTRAINT "learned_skills_character_name_fk" FOREIGN KEY ("character_name") REFERENCES "characters" ("name") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "learned_skills_skill_id_fk" FOREIGN KEY ("skill_id") REFERENCES "skills" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("character_name", "skill_id"))`);
        await queryRunner.query(`INSERT INTO "temporary_learned_skills"("character_name", "skill_id", "level", "train_time_remaining", "total_time") SELECT "character_name", "skill_id", "level", "train_time_remaining", "total_time" FROM "learned_skills"`);
        await queryRunner.query(`DROP TABLE "learned_skills"`);
        await queryRunner.query(`ALTER TABLE "temporary_learned_skills" RENAME TO "learned_skills"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "learned_skills" RENAME TO "temporary_learned_skills"`);
        await queryRunner.query(`CREATE TABLE "learned_skills" ("character_name" varchar NOT NULL, "skill_id" integer NOT NULL, "level" integer NOT NULL, "train_time_remaining" integer NOT NULL, "total_time" integer NOT NULL, PRIMARY KEY ("character_name", "skill_id"))`);
        await queryRunner.query(`INSERT INTO "learned_skills"("character_name", "skill_id", "level", "train_time_remaining", "total_time") SELECT "character_name", "skill_id", "level", "train_time_remaining", "total_time" FROM "temporary_learned_skills"`);
        await queryRunner.query(`DROP TABLE "temporary_learned_skills"`);
        await queryRunner.query(`DROP TABLE "configurations"`);
        await queryRunner.query(`DROP TABLE "item_available_at_stations"`);
        await queryRunner.query(`DROP TABLE "learned_skills"`);
        await queryRunner.query(`DROP TABLE "characters"`);
        await queryRunner.query(`DROP TABLE "sectors"`);
        await queryRunner.query(`DROP INDEX "sector_resources_entity_type_idx"`);
        await queryRunner.query(`DROP TABLE "sector_resources"`);
        await queryRunner.query(`DROP TABLE "ship_available_at_stations"`);
        await queryRunner.query(`DROP TABLE "ships"`);
        await queryRunner.query(`DROP TABLE "ship_specials"`);
        await queryRunner.query(`DROP TABLE "skill_dependencies"`);
        await queryRunner.query(`DROP TABLE "skill_available_at_stations"`);
        await queryRunner.query(`DROP TABLE "stations"`);
        await queryRunner.query(`DROP TABLE "skills"`);
        await queryRunner.query(`DROP INDEX "items_entity_type_idx"`);
        await queryRunner.query(`DROP TABLE "items"`);
        await queryRunner.query(`DROP TABLE "warp_gates"`);
    }

}
