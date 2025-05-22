import { Request, Response, NextFunction } from 'express';
import GameCore from '../core/game.core';
import { GameStatus } from "../core/game.types";

export const spin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const game = new GameCore(req.session.credits || 0);
    const result = game.spin();

    req.session.credits = result.credits;
    if (result.credits > 0) {
      req.session.status = GameStatus.Playing;
    } else {
      req.session.status = GameStatus.Initial;
    }
    res.json({
      data: {
        status: req.session.status,
        ...result,
      },
    });
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
    res.json({
      data: {
        credits: req.session.credits || 0,
        status: req.session.status || GameStatus.Initial,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const startGame = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    req.session.credits = 10;
    req.session.status = GameStatus.Started;
    res.json({
      data: {
        credits: req.session.credits,
        status: req.session.status,
      },
    });
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
    req.session.regenerate((err) => {
      req.session.credits = 0;
      req.session.status = GameStatus.Initial;
      res.json({
        data: {
          cashedOut: credits,
          status: req.session.status,
          credits: req.session.credits,
        },
      });
      if (err) return next(err);
    });
  } catch (error) {
    next(error);
  }
};
