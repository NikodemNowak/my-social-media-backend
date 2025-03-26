"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jwt_1 = require("../utils/jwt");
const userRepository_1 = require("../repositories/userRepository");
const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).json({ message: 'Acess token is missing' });
        return;
    }
    const token = authHeader.split(' ')[1];
    try {
        const payload = (0, jwt_1.verifyAccessToken)(token);
        const userRepository = new userRepository_1.UserRepository();
        const user = await userRepository.findById(payload.id);
        if (!user) {
            res.status(401).json({ message: 'User not found' });
            return;
        }
        if (user.tokenVersion !== payload.tokenVersion) {
            res.status(401).json({ message: 'Token has been invalidated' });
            return;
        }
        req.user = payload;
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Token is invalid' });
    }
};
exports.authMiddleware = authMiddleware;
