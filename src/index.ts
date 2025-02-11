import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db/db';
import GeneralRouter from './routes/general.routes';
import UserRouter from './routes/user.routes';
import OrgRouter from './routes/org.routes';
import cors from 'cors';
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/v1', GeneralRouter);
app.use('/api/v1/user', UserRouter);
app.use('/api/v1/org', OrgRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});