import dotenv from 'dotenv';

dotenv.config();

const vars = {
    nodeEnv: process.env.NODE_ENV,
    port: process.env.PORT,
    host: process.env.HOST,
    dbHost: process.env.DB_HOST,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
    dbPort: process.env.DB_PORT,
    corsAllowedOrigins: process.env.CORS_ALLOWED_ORIGINS,
    infuraUrl: process.env.INFURA_URL,
    contractAddress: process.env.CONTRACT_ADDRESS,
    pollingInterval: process.env.POLLING_INTERVAL,
};

export default vars;