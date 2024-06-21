import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from "helmet";
import compression from 'compression';
import dotenv from "dotenv";
import { errorHandler, notFound } from './middlewares/errors';
import router from './routes/index';
import './utilss/scheduler';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(router);
app.use(helmet());
app.use(compression());
app.use(notFound);
app.use(errorHandler);


export default app;