"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordHashMiddleware = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = 12;
const passwordHashMiddleware = async (req, res, next) => {
    if (req.body && req.body.password) {
        try {
            console.log(req.body.password);
            const hashedPassword = await bcrypt_1.default.hash(req.body.password, saltRounds);
            req.body.password = hashedPassword;
            console.log(hashedPassword);
            next();
        }
        catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    }
    else {
        res.status(400).json({ error: "Bad request" });
    }
};
exports.passwordHashMiddleware = passwordHashMiddleware;
