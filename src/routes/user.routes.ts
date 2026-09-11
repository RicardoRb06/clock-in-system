import { Router } from 'express';
import { userController } from '../controller/user.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

export function createUserRoutes(): Router {
    const router: Router = Router();

    router.get('/get-all', authMiddleware.validate, (req, res) => userController.getUsers(req, res));

    return router;
}
