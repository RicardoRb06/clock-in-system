import express from 'express';
import "dotenv/config";
import { ErrorMiddleware } from './middlewares/error.middleware.js';
import { routes } from './routes/routes.js'
import { CorsMiddleware } from './middlewares/cors.middleware.js';
import { env } from '../src/config/env.js';

const app = express();
const PORT = env.PORT;

const corsMiddleware = new CorsMiddleware(env.CORS_ALLOWED_ORIGINS);
app.use(corsMiddleware.handler());

app.use(express.json());

app.use(routes);

const errorMiddleware = new ErrorMiddleware();

app.use(errorMiddleware.handle);

app.listen(PORT, () => {
    console.log("server open and running on port" + PORT)
})
