import { Router } from 'express';
import {
    spin,
  currentGame,
  cashOut
} from '../controllers/game-controller';

const router = Router();

router.post('/spin', spin);
router.post('/cash-out', cashOut);
router.get('/current', currentGame);

export default router;