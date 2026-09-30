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
            return fail(res, 400, result.error);
        }

        return complete(res, 200, undefined);
    }

    async clockOut(req: Request, res: Response) {
        const result = await this.timeEntryService.clockOut(req.body);

        if (!result.success) {
            return fail(res, 400, result.error);
        }

        return complete(res, 200, undefined);
    }

    async getMonthlyTotal(req: Request, res: Response) {
        const result = await this.timeEntryService.getMonthlyTotal({
            userId: String(req.query.userId),
            year: Number(req.query.year),
            month: Number(req.query.month)
        });

        if (!result.success) {
            return fail(res, 400, result.error);
        }

        return complete(res, 200, result.data);
    }
}

export const timeEntryController = new TimeEntryController(timeEntryService);