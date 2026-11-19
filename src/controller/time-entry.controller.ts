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

    async getMyMonthlyTotal(req: Request, res: Response) {
        const userId = req.user?.id;

        if (!userId) {
            return fail(res, 401, new Error("Não autenticado."));
        }

        const result = await this.timeEntryService.getMonthlyTotal({
            userId,
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1
        });

        if (!result.success) {
            return fail(res, 400, result.error);
        }

        return complete(res, 200, result.data);
    }

    async getUserMonthlyTotal(req: Request, res: Response) {
        const userId = req.body.userId;

        if(!userId) {
            return fail(res, 404, new Error("Usuário não encontrado."));
        }

        const result = await this.timeEntryService.getMonthlyTotal({
            userId,
            year: req.body.year ?? new Date().getFullYear(),
            month: req.body.month ?? new Date().getMonth() + 1
        })

        if (!result.success) {
            return fail(res, 400, result.error);
        }

        return complete(res, 200, result.data);
    }
}

export const timeEntryController = new TimeEntryController(timeEntryService);