# Smart Construction Dashboard
[![Build Status](https://travis-ci.org/shashikhanal/cesium.svg?branch=main)](https://travis-ci.org/shashikhanal/cesium)
[![GitHub license](https://img.shields.io/github/license/shashikhanal/cesium.svg)](https://github.com/shashikhanal/cesium/blob/main/LICENSE)


> Smart Construction Dashboard has a feature that allows users to create and edit a catalog of materials, such as sand, gravel, and dirt, for construction projects. At a high level, this feature will: fetch the current list of materials for the current site, allow the user to create, edit, and delete materials, and display the total cost of all materials.


## Prerequisites

- [Node.js](https://nodejs.org/dist/v14.16.0/) - 14.16.0 or above
- [NPM](https://docs.npmjs.com/getting-started/installing-node) - 7.7.6 or above
- [PostgreSQL](https://www.postgresql.org/download/) - 13.2 or above

-------------------
## Setup

Clone the repository and install the dependencies.

    $ git clone git@github.com:shashikhanal/cesium.git <application-name>
    $ cd <application-name>
    $ npm install

Make a copy of `.env.example` as `.env` and update your application details.

    $ cp .env.example .env

This project requires a PostgreSQL database. If you do not have PostgreSQL installed, you can run start one via [Docker](https://hub.docker.com/_/postgres) using following command :

```
docker run --rm -p 5432:5432 -e POSTGRES_PASSWORD=pg_password -d postgres
```

*Update `.env` file accordingly if needed and make sure your database is up and running.*

Run migration
```
npm run db-migrate
```

Run database seed
```
npm run db-seed
```

## Run and start server
```
$ npm run start
```

*Server started at `http://127.0.0.1:8080` with default configurations.*

That's it, setup is complete and server is running live.

## Use API endpoints
There are two folders in `<application-name>/APIs` directory.
- PostmanCollection directory- It contains a JSON file which can be directly imported into `Postman` client along with its required `environment variables` for Postman.
- OpenAPI directory - It contains a file obtained from converting the above Postman collection into `OpenAPI v3.0.0` standard.

*After importing OpenAPI file, it might require some minor changes in order to successfully hit the endpoints. Please, contact `khanalshashi@gmail.com` for any confusions.* 

## Tests

    $ npm run test

## Scripts Description

| Task                  | Description                                                                 |
| --------------------- | --------------------------------------------------------------------------- |
| `start`               | Runs the server on port 8080 (by default)                                                |
| `test`                | Runs mocha unit tests                                                     |
| `db-migrate`          | Applies all pending migrations to the database                              |
| `db-rollback`         | Rolls back last set of database migrations                                  |
| `db-seed`             | Seeds the database with test data                                           |
| `db-create-migration` | Creates a new database migration, takes a single parameter (migration name) |

## License

[MIT License](https://opensource.org/licenses/MIT)