"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const userValidation_1 = require("../validations/userValidation");
const jwt_1 = require("../utils/jwt");
class UserController {
    constructor(userSerivce) {
        this.userSerivce = userSerivce;
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const validation = userValidation_1.loginSchema.safeParse({ email, password });
            if (!validation.success) {
                res.status(400).json(validation.error);
                return;
            }
            const tokens = await this.userSerivce.login(email, password);
            res.cookie("refreshToken", tokens.refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 1000 * 60 * 60 * 24 * 7,
            });
            res.status(200).json({ accessToken: tokens.accessToken });
        }
        catch (error) {
            res.status(401).json({ message: error.message });
        }
    }
    async register(req, res) {
        const validation = userValidation_1.registerSchema.safeParse(req.body);
        if (!validation.success) {
            res.status(400).json(validation.error);
            return;
        }
        try {
            const newUser = await this.userSerivce.register(validation.data);
            res.status(201).json(newUser);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async getUserProfile(req, res) {
        const userId = req.params.userId;
        try {
            const user = await this.userSerivce.getUserProfile(userId);
            res.status(200).json(user);
        }
        catch (error) {
            res.status(404).json({ message: "User not found" });
        }
    }
    async refreshToken(req, res) {
        try {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) {
                res.status(401).json({ message: "Refresh token is missing" });
                return;
            }
            const payload = (0, jwt_1.verifyRefreshToken)(refreshToken);
            const user = await this.userSerivce.getUserById(payload.id);
            if (!user) {
                res.status(401).json({ message: "User not found" });
                return;
            }
            if (user.tokenVersion !== payload.tokenVersion) {
                res.status(401).json({ message: "Token has been invalidated" });
                return;
            }
            const isRefrshExpired = Date.now() >= payload.exp * 1000;
            if (isRefrshExpired) {
                res.status(401).json({ message: "Refresh token has expired, login again" });
                return;
            }
            const accessToken = (0, jwt_1.refreshAccessToken)(payload);
            res.status(200).json({ accessToken });
        }
        catch (error) {
            res.status(401).json({ message: "Token is invalid" });
        }
    }
}
exports.UserController = UserController;
