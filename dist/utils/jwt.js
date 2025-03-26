"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.verifyAccessToken = exports.refreshAccessToken = exports.generateAuthTokens = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const accessSecret = process.env.JWT_ACCESS_SECRET;
const accessExpiresIn = process.env.ACCESS_TOKEN_EXP || '15m';
const refreshSecret = process.env.JWT_REFRESH_SECRET;
const refreshExpiresIn = process.env.REFRESH_TOKEN_EXP || '7d';
const generateAuthTokens = (payload) => {
    const accessToken = jsonwebtoken_1.default.sign(payload, accessSecret, { expiresIn: accessExpiresIn });
    const refreshToken = jsonwebtoken_1.default.sign(payload, refreshSecret, { expiresIn: refreshExpiresIn });
    return { accessToken, refreshToken };
};
exports.generateAuthTokens = generateAuthTokens;
const refreshAccessToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, accessSecret, { expiresIn: accessExpiresIn });
};
exports.refreshAccessToken = refreshAccessToken;
const verifyAccessToken = (token) => {
    return jsonwebtoken_1.default.verify(token, accessSecret);
};
exports.verifyAccessToken = verifyAccessToken;
const verifyRefreshToken = (token) => {
    return jsonwebtoken_1.default.verify(token, refreshSecret);
};
exports.verifyRefreshToken = verifyRefreshToken;
