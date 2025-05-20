import config from './config/common';
import express from 'express';
import gameRoutes from './routes/game';
import { errorHandler } from './middlewares/errorHandler';
import session from './middlewares/session';
import cors from './middlewares/cors';

const app = express();

app.use(express.json());
app.use(cors());
app.use(session(config.sessionSecret, config.nodeEnv));

// Routes
app.use('/api/game', gameRoutes);

// Global error handler (should be after routes)
app.use(errorHandler);

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});