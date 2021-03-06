import { knex } from 'knex';
import config from '../../../knexfile';

const conf = config[process.env.NODE_ENV ?? 'development'];
const knexInstance = knex(conf);

export default knexInstance;
