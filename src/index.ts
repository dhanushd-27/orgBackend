import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db/db';
import GeneralRouter from './routes/general.routes';
dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/v1', GeneralRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});