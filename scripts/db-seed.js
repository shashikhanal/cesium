import knex from 'knex';
import * as uuid from 'uuid';
import connectionString from '../src/config/database.js';

const client = knex({
  client: "pg",
  connection: connectionString,
});

async function main() {
  // delete all existing sites and create some dummy sites
  await client("construction_sites").delete();
  // delete all materials and add some dummy materials
  await client("materials").delete();

  // add 10 construction sites and a material for each site
  for (let i = 0; i < 10; i++) {
    const construction_site_id = uuid.v4();
    const project = await client("construction_sites")
      .insert({
        id: construction_site_id,
      })
      .returning("*");
    
    const material = await client("materials")
      .insert({
        name: "Sand",
        construction_site: construction_site_id,
        volume_cubic_meter: 10.5,
        cost_cubic_meter: 10,
        color: "red",
        delivery_date: "2021-01-01"
      })
      .returning("*");
    
    console.log(`Created construction site with id ${project[0].id} along with a dummy material.`);
  }
}

main()
  .catch((err) => {
    console.log(err);
  })
  .finally(() => client.destroy());
