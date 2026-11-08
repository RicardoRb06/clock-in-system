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

        return complete(res, 200, "Ponto aberto com sucesso!");
    }

    async clockOut(req: Request, res: Response) {
        const result = await this.timeEntryService.clockOut(req.body);

        if (!result.success) {
            return fail(res, 400, result.error);
        }

        return complete(res, 200, "Ponto fechado com sucesso!");
    }

    async getMonthlyTotal(req: Request, res: Response) {
        const userId = req.body.id ? req.body.id : req.user?.id;

        if (!userId) {
            return fail(res, 401, new Error("Não autenticado."));
        }

        const result = await this.timeEntryService.getMonthlyTotal({
            userId,
            year: req.body.year ? req.body.year : Number(Date.prototype.getFullYear),
            month: req.body.month ? req.body.month : Number(Date.prototype.getMonth)
        });

        if (!result.success) {
            return fail(res, 400, result.error);
        }

        return complete(res, 200, result.data);
    }
}

export const timeEntryController = new TimeEntryController(timeEntryService);