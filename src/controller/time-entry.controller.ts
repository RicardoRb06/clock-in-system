import type { TimeEntryService } from "../service/time-entry.service.js";
import type { Request, Response } from 'express';
import { complete, fail } from '../utils/result.js';
import { timeEntryService } from "../service/time-entry.service.js";

export class TimeEntryController {

    private timeEntryService: TimeEntryService;

    constructor(timeEntryService: TimeEntryService) {
        this.timeEntryService = timeEntryService;
    }

    async clockIn(req: Request, res: Response) {
        const result = await this.timeEntryService.clockIn(req.body);

        if (!result.success) {
            return fail(res, result.error);
        }

        return complete(res, 200, undefined);
    }

    async clockOut(req: Request, res: Response) {
        const result = await this.timeEntryService.clockOut(req.body);

        if (!result.success) {
            return fail(res, result.error);
        }

        return complete(res, 200, undefined);
    }
}

export const timeEntryController = new TimeEntryController(timeEntryService);