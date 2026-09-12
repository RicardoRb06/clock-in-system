import { Router } from 'express';
import { timeEntryController } from '../controller/time-entry.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { TimeEntryRequestSchema } from '../dto/time-entry.dto.js';

export function createTimeEntryRoutes(): Router {
    const router: Router = Router();

    router.post('/clock-in', authMiddleware.validate, validate(TimeEntryRequestSchema), (req, res) => timeEntryController.clockIn(req, res));

    router.post('/clock-out', authMiddleware.validate, validate(TimeEntryRequestSchema), (req, res) => timeEntryController.clockOut(req, res));

    return router;
}
