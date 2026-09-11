import { TimeEntryRequestSchema } from "../dto/time-entry.dto.js";
import type { TimeEntryService } from "../service/time-entry.service.js";
import type { Request, Response } from 'express';
import { complete, fail } from '../utils/result.js';
import { z } from 'zod';

export class TimeEntryController {

    private timeEntryService: TimeEntryService;

    constructor(timeEntryService: TimeEntryService) {
        this.timeEntryService = timeEntryService;
    }

    async clockIn(req: Request, res: Response) {
        const dto = TimeEntryRequestSchema.safeParse(req.body);

        if (!dto.success) {
            return res.status(400).json({
                success: false,
                message: "Dados de envio inválidos",
                errors: z.flattenError(dto.error).fieldErrors
            });
        }

        const result = await this.timeEntryService.clockIn(dto.data);

        if (!result.success) {
            return fail(res, result.error);
        }

        return complete(res, 200, undefined);
    }

    async clockOut(req: Request, res: Response) {
        const dto = TimeEntryRequestSchema.safeParse(req.body);

        if (!dto.success) {
            return res.status(400).json({
                success: false,
                message: "Dados de envio inválidos",
                errors: z.flattenError(dto.error).fieldErrors
            });
        }

        const result = await this.timeEntryService.clockOut(dto.data);

        if (!result.success) {
            return fail(res, result.error);
        }

        return complete(res, 200, undefined);
    }
}