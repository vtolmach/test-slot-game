import dotenv from 'dotenv';

dotenv.config();

interface Config {
    port: number;
    nodeEnv: string;
    sessionSecret: string;
    corsOrigin: string[]
}

const config: Config = {
    port: Number(process.env.PORT) || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    sessionSecret: process.env.SESSION_SECRET || 'some-default-secret',
    corsOrigin: [ process.env.CORS_ORIGIN || 'http://localhost:5173' ],
};

export default config;