// Update with your config settings.

import path from 'path';

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'db',
      database: 'my_app_db_test',
      user: 'postgres',
      password: 'postgres'
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: path.join(__dirname, '/src/config/db/migrations')
    },
    seeds: {
      directory: path.join(__dirname, '/src/config/db/seeds')
    }
  },

  staging: {
    client: 'pg',
    connection: {
      host: 'db',
      database: 'my_app_db',
      user: 'postgres',
      password: 'postgres'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: path.join(__dirname, '/src/config/db/migrations')
    }
  },

  production: {
    client: 'pg',
    connection: {
      host: 'db',
      database: 'my_app_db',
      user: 'postgres',
      password: 'postgres'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: path.join(__dirname, 'config/db/migrations')
    }
  }
};
