import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { loginSchema, registerSchema } from "../validations/userValidation";
import { refreshAccessToken, verifyRefreshToken } from "../utils/jwt";

export class UserController {
    constructor(private userService: UserService) { }

    async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            const validation = loginSchema.safeParse({ email, password });
            if (!validation.success) {
                res.status(400).json(validation.error);
                return;
            }
            const tokens = await this.userService.login(email, password);

            res.cookie("refreshToken", tokens.refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 1000 * 60 * 60 * 24 * 7,
            });

            res.status(200).json({ accessToken: tokens.accessToken });
        } catch (error: any) {
            res.status(401).json({ message: error.message });
        }
    }

    async register(req: Request, res: Response): Promise<void> {
        const validation = registerSchema.safeParse(req.body);
        if (!validation.success) {
            res.status(400).json(validation.error);
            return;
        }

        try {
            const newUser = await this.userService.register(validation.data);
            res.status(201).json(newUser);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getUserProfile(req: Request, res: Response): Promise<void> {
        const userId = req.params.userId;
        try {
            const user = await this.userService.getUserProfile(userId);
            res.status(200).json(user);
        } catch (error) {
            res.status(404).json({ message: "User not found" });
        }
    }

    async refreshToken(req: Request, res: Response): Promise<void> {
        try {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) {
                res.status(401).json({ message: "Refresh token is missing" });
                return;
            }

            const payload = verifyRefreshToken(refreshToken) as any;

            const user = await this.userService.getUserById(payload.id);
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

            const accessToken = refreshAccessToken(payload);
            res.status(200).json({ accessToken });
        } catch (error) {
            res.status(401).json({ message: "Token is invalid" });
        }
    }

    async getUserAvatar(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.params.userId;
            const avatarUrl = await this.userService.getUserAvatar(userId);
            res.status(200).json({ avatarUrl });
        } catch (error) {
            res.status(500).json({ 
                message: error instanceof Error ? error.message : 'Failed to get avatar' 
            });
        }
    };
}
