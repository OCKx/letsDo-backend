import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import swaggerUi from "swagger-ui-express";
import { errorHandler, notFound } from './middlewares/errors';
import router from './routes/index';
import './utilss/scheduler';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(router);
app.use(notFound);
app.use(errorHandler);


export default app;