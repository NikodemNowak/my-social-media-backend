"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("../utils/jwt");
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async login(email, password) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }
        const payload = {
            id: user.id,
            email: user.email,
            tokenVersion: user.tokenVersion || 0
        };
        const tokens = (0, jwt_1.generateAuthTokens)(payload);
        return tokens;
    }
    async register(userData) {
        const exisitingUser = await this.userRepository.findByEmail(userData.email);
        if (exisitingUser) {
            throw new Error('Email already exists');
        }
        else {
            const existingUser = await this.userRepository.findByUsername(userData.username);
            if (existingUser) {
                throw new Error('Username already exists');
            }
        }
        const newUser = await this.userRepository.register(userData);
        return newUser;
    }
    async getUserProfile(userId) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
    async getUserById(userId) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
}
exports.UserService = UserService;
