import knex from 'knex';
import path from 'path';
import connectionString from '../src/config/database.js';
const __dirname = path.resolve();

/**
 * Function to run rollback
 */
function rollback() {
  const client = knex({
    client: "pg",
    connection: connectionString,
  });
  
  client.migrate
    .rollback()
    .then((results) => {
      const list = results[1];
      if (list.length === 0) {
        console.log("Already rolled back all versions.");
      } else {
        list.forEach((item) =>
          console.log("Unapplied: " + path.relative(__dirname, item))
        );
      }
    })
    .catch((e) => console.log(e))
    .finally(() => client.destroy())
    .catch((e) => console.log(e));
}

/**
 * Runs rollback
 */
rollback();
