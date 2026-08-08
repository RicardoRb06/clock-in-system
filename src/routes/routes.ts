import { Router } from 'express';
import { UserRepository } from '../repository/user.repository.js';
import { AuthService } from '../service/auth.service.js';
import { AuthController } from '../controller/auth.controller.js';
import { AuthMiddleware } from '../middlewares/auth.middleware.js';
import { prisma } from '../database/prisma.js';

export const routes: Router = Router();

const userRepository = new UserRepository(prisma);

const authService = new AuthService(userRepository);

const authController = new AuthController(authService);

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
    throw new Error("JWT_SECRET_MISSING: Defina a chave secreta no arquivo .env antes de rodar o app.");
}

const authMiddleware = new AuthMiddleware(jwtSecret);

routes.post('/auth/register', (req, res) => authController.register(req, res));

routes.post('/auth/login', (req, res) => authController.login(req, res));