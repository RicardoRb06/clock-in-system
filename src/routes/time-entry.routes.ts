import { Router } from 'express';
import { prisma } from '../database/prisma.js';
import { env } from '../config/env.js';
import { TimeEntryRepository } from '../repository/time-entry.repository.js';
import { TimeEntryService } from '../service/time-entry.service.js';
import { TimeEntryController } from '../controller/time-entry.controller.js';
import { AuthMiddleware } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { TimeEntryRequestSchema } from '../dto/time-entry.dto.js';

export function createTimeEntryRoutes(): Router {
    const timeEntryRepository = new TimeEntryRepository(prisma);
    const timeEntryService = new TimeEntryService(timeEntryRepository);
    const timeEntryController = new TimeEntryController(timeEntryService);

    const authMiddleware = new AuthMiddleware(env.JWT_SECRET);

    const router: Router = Router();

    router.post('/clock-in', authMiddleware.validate, validate(TimeEntryRequestSchema), (req, res) => timeEntryController.clockIn(req, res));

    router.post('/clock-out', authMiddleware.validate, validate(TimeEntryRequestSchema), (req, res) => timeEntryController.clockOut(req, res));

    return router;
}
