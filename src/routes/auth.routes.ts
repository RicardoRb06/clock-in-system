import { Router } from 'express';
import { prisma } from '../database/prisma.js';
import { env } from '../config/env.js';
import { UserRepository } from '../repository/user.repository.js';
import { AuthService } from '../service/auth.service.js';
import { AuthController } from '../controller/auth.controller.js';
import { AuthMiddleware } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { LoginRequestSchema, RegisterRequestSchema } from '../dto/auth.dto.js';

export function createAuthRoutes(): Router {
    const userRepository = new UserRepository(prisma);
    const authService = new AuthService(userRepository);
    const authController = new AuthController(authService);

    const authMiddleware = new AuthMiddleware(env.JWT_SECRET);

    const router: Router = Router();

    router.post('/register', validate(RegisterRequestSchema), (req, res) => authController.register(req, res));

    router.post('/login', validate(LoginRequestSchema), (req, res) => authController.login(req, res));

    router.get('/logout', (req, res) => authController.logout(req, res));

    router.get('/me', authMiddleware.validate, (req, res) => authController.me(req, res));

    return router;
}
