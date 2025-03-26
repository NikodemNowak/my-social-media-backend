import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const passwordSchema = z
    .string()
    .min(8)
    .max(64)
    .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$&*]).{8,64}$/);

export const passwordValidationMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const password = req.body.password;
    const validation = passwordSchema.safeParse(password);
    if (!validation.success) {
        res.status(400).json({ message: validation.error.errors[0].message });
        return;
    }
    next();
};
