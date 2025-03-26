"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGODB_URI);
        console.log('🟢 Połączono z MongoDB');
        return mongoose_1.default.connection;
    }
    catch (error) {
        console.error('🔴 Błąd połączenia z MongoDB:', error);
        process.exit(1);
    }
};
exports.default = connectDB;
