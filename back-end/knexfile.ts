// // Update with your config settings.
// import path from 'path';

// interface KnexConfig {
//   [key: string]: object;
// }

// const knexConfig: KnexConfig = {
//   development: {
//     client: 'pg',
//     connection: {
//       host: 'db',
//       database: 'my_app_db_test',
//       user: 'postgres',
//       password: 'postgres'
//     },
//     migrations: {
//       tableName: 'knex_migrations',
//       directory: path.join(__dirname, '/src/config/db/migrations')
//     },
//     seeds: {
//       directory: path.join(__dirname, '/src/config/db/seeds')
//     }
//   },

//   staging: {
//     client: 'pg',
//     connection: {
//       host: 'db',
//       database: 'my_app_db',
//       user: 'postgres',
//       password: 'postgres'
//     },
//     pool: {
//       min: 2,
//       max: 10
//     },
//     migrations: {
//       tableName: 'knex_migrations',
//       directory: path.join(__dirname, '/src/config/db/migrations')
//     }
//   },

//   production: {
//     client: 'pg',
//     connection: {
//       host: 'db',
//       database: 'my_app_db',
//       user: 'postgres',
//       password: 'postgres'
//     },
//     pool: {
//       min: 2,
//       max: 10
//     },
//     migrations: {
//       tableName: 'knex_migrations',
//       directory: path.join(__dirname, 'config/db/migrations')
//     }
//   }
// };

// export default knexConfig;
import path from 'path';

require('dotenv').config();

interface KnexConfig {
  [key: string]: object;
}

const config: KnexConfig = {
  development: {
    client: 'postgresql',
    connection: {
      host: 'db',
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: path.join(__dirname, '/src/config/db/migrations')
    },
    seeds: {
      directory: path.join(__dirname, '/src/config/db/seeds')
    }
  },
  production: {
    client: 'postgresql',
    connection: {
      host: 'db',
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: path.join(__dirname, '/src/config/db/migrations')
    },
    seeds: {
      directory: path.join(__dirname, '/src/config/db/seeds')
    }
  }
};

export default config;
