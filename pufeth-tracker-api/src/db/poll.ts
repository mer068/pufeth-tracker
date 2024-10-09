import { Pool } from 'pg';
import vars from "../config/vars";
import logger from "../middleware/logger";

const pool = new Pool({
    host: vars.dbHost,
    user: vars.dbUser,
    password: vars.dbPassword,
    database: vars.dbName,
    port: Number(vars.dbPort),
});

pool.on('connect', () => {
    logger.info('Connected to the PostgreSQL database');
});

pool.on('error', (err) => {
    logger.error('Unexpected error on idle client', err);
    process.exit(-1);
});

export default pool;
