import jwt, { SignOptions } from 'jsonwebtoken';

const accessSecret = process.env.JWT_ACCESS_SECRET as string;
const accessExpiresIn = process.env.ACCESS_TOKEN_EXP || '15m';

const refreshSecret = process.env.JWT_REFRESH_SECRET as string;
const refreshExpiresIn = process.env.REFRESH_TOKEN_EXP || '7d';

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}

export const generateAuthTokens = (payload: object): AuthTokens => {
    const accessToken = jwt.sign(payload, accessSecret, { expiresIn: accessExpiresIn } as SignOptions);
    const refreshToken = jwt.sign(payload, refreshSecret, { expiresIn: refreshExpiresIn } as SignOptions);
    return { accessToken, refreshToken };
}

export const refreshAccessToken = (payload: string) => {
    return jwt.sign(payload, accessSecret, { expiresIn: accessExpiresIn } as SignOptions);
}

export const verifyAccessToken = (token: string) => {
    return jwt.verify(token, accessSecret);
}

export const verifyRefreshToken = (token: string) => {
    return jwt.verify(token, refreshSecret);
}