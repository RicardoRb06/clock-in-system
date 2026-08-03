import express from 'express';
import "dotenv/config";
import { ErrorMiddleware } from './middlewares/error.middleware.js';
import { routes } from './routes/routes.js'

const app = express();
const PORT = 8080;

app.use(express.json());

app.use(routes);

const errorMiddleware = new ErrorMiddleware();

app.use(errorMiddleware.handle);

app.listen(PORT, () => {
    console.log("server open and running on port" + PORT)
})
