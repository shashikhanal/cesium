import * as uuid from 'uuid';

/**
 * Migration file to create materials table
 * @param {*} knex 
 * @returns 
 */
 const up = function (knex) {
  return knex.schema.createTable("materials", function (table) {
    table.increments("id").primary();
    table.string("name");
    table.uuid("construction_site").notNullable().references("id").inTable("construction_sites");
    table.float("volume_cubic_meter").notNullable();
    table.float("cost_cubic_meter").notNullable();
    table.string("color").notNullable();
    table.date("delivery_date");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

const down = function (knex) {
  return knex.schema.dropTable("materials");
};

export { up, down };
