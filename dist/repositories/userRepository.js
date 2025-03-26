"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const User_1 = __importDefault(require("../models/User"));
class UserRepository {
    async findById(userId) {
        return User_1.default.findById(userId).exec();
    }
    async findByEmail(email) {
        return User_1.default.findOne({ email }).exec();
    }
    async findByUsername(username) {
        return User_1.default.findOne({ username }).exec();
    }
    async register(userData) {
        const user = new User_1.default(userData);
        console.log(user);
        return user.save();
    }
}
exports.UserRepository = UserRepository;
