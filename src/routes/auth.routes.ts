import { Router } from 'express';
import { authController } from '../controller/auth.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { LoginRequestSchema, RegisterRequestSchema } from '../dto/auth.dto.js';

export function createAuthRoutes(): Router {
    const router: Router = Router();

    router.post('/register', validate(RegisterRequestSchema), (req, res) => authController.register(req, res));

    router.post('/login', validate(LoginRequestSchema), (req, res) => authController.login(req, res));

    router.get('/logout', (req, res) => authController.logout(req, res));

    router.get('/me', authMiddleware.validate, (req, res) => authController.me(req, res));

    return router;
}
