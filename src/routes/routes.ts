import { Router } from 'express';
import { UserRepository } from '../repository/user.repository.js';
import { AuthService } from '../service/auth.service.js';
import { AuthController } from '../controller/auth.controller.js';
import { AuthMiddleware } from '../middlewares/auth.middleware.js';
import { prisma } from '../database/prisma.js';
import { TimeEntryRepository } from '../repository/time-entry.repository.js';
import { TimeEntryService } from '../service/time-entry.service.js';
import { TimeEntryController } from '../controller/time-entry.controller.js';

export const routes: Router = Router();

const userRepository = new UserRepository(prisma);
const timeEntryRepository = new TimeEntryRepository(prisma);

const authService = new AuthService(userRepository);
const timeEntryService = new TimeEntryService(timeEntryRepository);

const authController = new AuthController(authService);
const timeEntryController = new TimeEntryController(timeEntryService);

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
    throw new Error("JWT_SECRET_MISSING: Defina a chave secreta no arquivo .env antes de rodar o app.");
}

const authMiddleware = new AuthMiddleware(jwtSecret);

routes.post('/auth/register', (req, res) => authController.register(req, res));

routes.post('/auth/login', (req, res) => authController.login(req, res));

routes.post('/time-entry/clock-in', authMiddleware.validate, (req, res) => timeEntryController.clockIn(req, res));

routes.post('/time-entry/clock-out', authMiddleware.validate, (req, res) => timeEntryController.clockOut(req, res));