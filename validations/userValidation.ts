import { z } from 'zod';

export const registerSchema = z.object({
    username: z.string()
        .min(3)
        .max(30),
    email: z.string().email(),
    password: z.string()
})

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

export const forgotPasswordSchema = z.object({
    email: z.string().email()
})
