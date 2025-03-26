import express from 'express';
import connectDB from './config/db';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import userRoutes from './routes/userRoutes';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Parsowanie JSON w ciele żądania
app.use(express.urlencoded({ extended: true })); // Obsługa danych x-www-form-urlencoded
app.use(cookieParser()); // Obsługa ciasteczek
app.use(morgan('dev')); // Logowanie zapytań HTTP
app.use(helmet()); // Zabezpieczenia HTTP  
app.use(cors()); // Zezwolenie na żądania z innych dom

app.use('/api/users', userRoutes);

// Endpoint testowy
app.get('/', async (req, res) => {
  try {
    const dbStatus = mongoose.connection.readyState;
    res.json({
      status: 'OK',
      database: dbStatus === 1 ? 'Połączono' : 'Brak połączenia',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: 'Błąd serwera' });
  }
});

// Inicjalizacja połączenia i start serwera
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`🚀 Serwer działa na http://localhost:${port}`);
  });
});
