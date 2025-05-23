import cors from 'cors';
import config from '../config/common';
const corsOptions = {
    origin: [ config.corsOrigin ] ,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
export default () => cors(corsOptions);