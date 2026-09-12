import { Router } from 'express';
import { createAuthRoutes } from './auth.routes.js';
import { createTimeEntryRoutes } from './time-entry.routes.js';
import { createUserRoutes } from './user.routes.js';

export const routes: Router = Router();

routes.use('/auth', createAuthRoutes());

routes.use('/time-entry', createTimeEntryRoutes());

routes.use('/users', createUserRoutes());
