/**
 * Migration file to create construction_sites table
 * @param {*} knex 
 * @returns 
 */
const up = function (knex) {
  return knex.schema.createTable("construction_sites", function (table) {
    table.uuid("id").primary();
  });
};

const down = function (knex) {
  return knex.schema.dropTable("construction_sites");
};

export { up, down };