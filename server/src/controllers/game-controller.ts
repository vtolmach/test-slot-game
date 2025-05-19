import { Request, Response, NextFunction } from 'express';

export const spin = (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(201).json({});
    } catch (error) {
        next(error);
    }
}