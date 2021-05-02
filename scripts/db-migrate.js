import knex from 'knex';
import path from 'path';
import connectionString from '../src/config/database.js';
const __dirname = path.resolve();

/**
 * Function to run migration
 * @returns 
 */
function migrate() {
  const client = knex({
    client: "pg",
    connection: connectionString,
  });
  
  return client.migrate
    .latest()
    .then(function (results) {
      const list = results[1];
      console.log("Database Migration:");
      if (list.length === 0) {
        console.log("\tAlready at latest version.");
      } else {
        list.forEach(function (item) {
          console.log("\tApplied: " + path.relative(__dirname, item));
        });
      }
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => client.destroy());
}
/**
 * Runs migration
 */
migrate();
