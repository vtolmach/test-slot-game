import { Request, Response, NextFunction } from 'express';
import { promisify } from 'node:util';
import GameCore from '../core/game.core';

export const spin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const game = new GameCore(req.session.credits || 0);
    const result = game.spin();
    req.session.credits = result.credits;
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const currentGame = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.json({ credits: req.session.credits });
  } catch (error) {
    next(error);
  }
};

export const cashOut = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const credits = req.session.credits;
    const regenerate = promisify(req.session.regenerate);
    await regenerate();
    req.session.credits = 10;
    res.json({
      credits
    });
  } catch (error) {
    next(error);
  }
};
