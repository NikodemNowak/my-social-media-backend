import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt';
import { UserRepository } from '../repositories/userRepository';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).json({ message: 'Acess token is missing' });
        return;
    }
    const token = authHeader.split(' ')[1];
    try {
        const payload = verifyAccessToken(token) as any;

        const userRepository = new UserRepository();
        const user = await userRepository.findById(payload.id);
        if (!user) {
            res.status(401).json({ message: 'User not found' });
            return;
        }
        if (user.tokenVersion !== payload.tokenVersion) {
            res.status(401).json({ message: 'Token has been invalidated' });
            return;
        }

        (req as any).user = payload;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is invalid' });
    }
};