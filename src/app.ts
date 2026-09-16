import express from 'express';
import "dotenv/config";
import { ErrorMiddleware } from './middlewares/error.middleware.js';
import { routes } from './routes/routes.js'
import { CorsMiddleware } from './middlewares/cors.middleware.js';
import { env } from './config/env.js';
import cookieParser from 'cookie-parser';

export const app: express.Express = express();

const corsMiddleware = new CorsMiddleware(env.CORS_ALLOWED_ORIGINS);
app.use(corsMiddleware.handler());
app.use(cookieParser());

app.use(express.json());

app.use(routes);

const errorMiddleware = new ErrorMiddleware();

app.use(errorMiddleware.handle);
