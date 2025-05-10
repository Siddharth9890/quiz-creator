import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import quizRoutes from './src/routes/quiz';
import { mongoConnection } from './mongoConnection';

dotenv.config();

export const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', quizRoutes);

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

if (process.env.NODE !== "production") {
    console.log("comming from index.ts");
    mongoConnection(app);
}