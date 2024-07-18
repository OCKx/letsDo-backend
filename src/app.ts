import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from "helmet";
import compression from 'compression';
import dotenv from "dotenv";
import { errorHandler, notFound } from './middlewares/errors'; 
import router from './routes/index';
import './scheduler/scheduler.deleteOtp';
import './scheduler/scheduler.updateTaskStatus';
import './scheduler/scheduler.sendReminder';
import './scheduler/scheduler.completedSubTask';

dotenv.config();
const app = express();

app.use(cors({
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(router);
app.use(helmet());
app.use(compression());
app.use(notFound);
app.use(errorHandler);


export default app;