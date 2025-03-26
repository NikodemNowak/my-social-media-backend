"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordValidationMiddleware = void 0;
const zod_1 = require("zod");
const passwordSchema = zod_1.z
    .string()
    .min(8)
    .max(64)
    .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$&*]).{8,64}$/);
const passwordValidationMiddleware = (req, res, next) => {
    const password = req.body.password;
    const validation = passwordSchema.safeParse(password);
    if (!validation.success) {
        res.status(400).json({ message: validation.error.errors[0].message });
        return;
    }
    next();
};
exports.passwordValidationMiddleware = passwordValidationMiddleware;
