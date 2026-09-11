import { Router } from 'express';
import { prisma } from '../database/prisma.js';
import { env } from '../config/env.js';
import { UserRepository } from '../repository/user.repository.js';
import { UserService } from '../service/user.service.js';
import { UserController } from '../controller/user.controller.js';
import { AuthMiddleware } from '../middlewares/auth.middleware.js';

export function createUserRoutes(): Router {
    const userRepository = new UserRepository(prisma);
    const userService = new UserService(userRepository);
    const userController = new UserController(userService);

    const authMiddleware = new AuthMiddleware(env.JWT_SECRET);

    const router: Router = Router();

    router.get('/get-all', authMiddleware.validate, (req, res) => userController.getUsers(req, res));

    return router;
}
