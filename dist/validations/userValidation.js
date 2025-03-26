"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPasswordSchema = exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    username: zod_1.z.string()
        .min(3)
        .max(30),
    email: zod_1.z.string().email(),
    password: zod_1.z.string()
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string()
});
exports.forgotPasswordSchema = zod_1.z.object({
    email: zod_1.z.string().email()
});
