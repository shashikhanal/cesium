import knex from 'knex';
import connectionString from '../config/database.js';

const client = knex({
  client: "pg",
  connection: connectionString,
});

const TABLE = 'materials';

/**
 * Gets all the materials
 * @returns 
 */
async function getAll() {
  let response = await client.select('id', 'name', 'construction_site', 'volume_cubic_meter', 'cost_cubic_meter', 'color', 'delivery_date')
    .from(TABLE);
  
  return response;
}

/**
 * Gets all the materials as per the query
 * @param {*} query 
 * @returns 
 */
async function get(query) {
  return await client.select('id', 'name', 'construction_site', 'volume_cubic_meter', 'cost_cubic_meter', 'color', 'delivery_date')
    .from(TABLE)
    .where(query);
}

/**
 * Adds materials into the database
 * @param {*} data 
 * @returns 
 */
async function save(data) {
  return await client.insert(data).into(TABLE);
}

/**
 * Updates material
 * @param {*} condition 
 * @param {*} data 
 * @returns 
 */
async function update(condition, data) {
  return await client(TABLE).update(data).where(condition);
}

/**
 * Deletes materials
 * @param {*} ids 
 * @returns 
 */
async function deleteMaterials(ids) {
  return await client(TABLE).delete().whereIn('id', ids);
}

export { 
  get,
  getAll, 
  save,
  update,
  deleteMaterials
};