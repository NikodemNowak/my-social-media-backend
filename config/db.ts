import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('🟢 Połączono z MongoDB');
    return mongoose.connection;
  } catch (error) {
    console.error('🔴 Błąd połączenia z MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;
