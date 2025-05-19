import { Router } from 'express';
import {
    spin
} from '../controllers/game-controller';

const router = Router();

router.post('/spin', spin);

export default router;