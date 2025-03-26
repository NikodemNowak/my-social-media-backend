"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
// Middleware
app.use(express_1.default.json()); // Parsowanie JSON w ciele żądania
app.use(express_1.default.urlencoded({ extended: true })); // Obsługa danych x-www-form-urlencoded
app.use((0, cookie_parser_1.default)()); // Obsługa ciasteczek
app.use((0, morgan_1.default)('dev')); // Logowanie zapytań HTTP
app.use((0, helmet_1.default)()); // Zabezpieczenia HTTP  
app.use((0, cors_1.default)()); // Zezwolenie na żądania z innych dom
app.use('/api/users', userRoutes_1.default);
// Endpoint testowy
app.get('/', async (req, res) => {
    try {
        const dbStatus = mongoose_1.default.connection.readyState;
        res.json({
            status: 'OK',
            database: dbStatus === 1 ? 'Połączono' : 'Brak połączenia',
            timestamp: new Date().toISOString()
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Błąd serwera' });
    }
});
// Inicjalizacja połączenia i start serwera
(0, db_1.default)().then(() => {
    app.listen(port, () => {
        console.log(`🚀 Serwer działa na http://localhost:${port}`);
    });
});
