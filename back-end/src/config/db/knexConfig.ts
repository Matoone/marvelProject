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
    }
  }
};

export default config;
