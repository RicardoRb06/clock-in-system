import { Router } from 'express';
import { UserRepository } from '../repository/UserRepository.js';
import { AuthService } from '../service/AuthService.js';
import { AuthController } from '../controller/AuthController.js';
import { AuthMiddleware } from '../middlewares/AuthMiddleware.js';

export const routes: Router = Router();

const userRepository = new UserRepository();

const authService = new AuthService(userRepository);

const authController = new AuthController(authService);

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
    throw new Error("JWT_SECRET_MISSING: Defina a chave secreta no arquivo .env antes de rodar o app.");
}

const authMiddleware = new AuthMiddleware(jwtSecret);

routes.post('/auth/register', (req, res) => authController.register(req, res));

routes.post('/auth/login', authMiddleware.validate, (req, res) => authController.login(req, res));