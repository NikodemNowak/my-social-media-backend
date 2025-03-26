import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";

const saltRounds = 12;

export const passwordHashMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (req.body && req.body.password) {
        try {
            console.log(req.body.password);
            const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
            req.body.password = hashedPassword;
            console.log(hashedPassword);
            next();
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    } else {
        res.status(400).json({ error: "Bad request" });
    }
};
