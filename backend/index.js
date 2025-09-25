import { config } from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
config();
import connectDb from './config/db.js';
import authRoutes from './routes/user.routes.js';
app.use(cookieParser());
const app = express();
connectDb();
app.use(cors());
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api/v1/user', authRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(console.error);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));
