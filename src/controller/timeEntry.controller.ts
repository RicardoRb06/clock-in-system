import { timeEntryRequestSchema } from "../dto/time.entry/request/timeEntry.request.js";
import type { TimeEntryService } from "../service/time.entry.service.js";
import type { Request, Response } from 'express';
import { z } from 'zod';

export class TimeEntryController {
    
    private timeEntryService: TimeEntryService;
    
    constructor(timeEntryService: TimeEntryService) {
        this.timeEntryService = timeEntryService;
    }

    async clockIn(req: Request, res: Response) {
        const dto = timeEntryRequestSchema.safeParse(req.body);

        if (!dto.success) {
            return res.status(400).json({ 
                success: false, 
                message: "Dados de envio inválidos",
                errors: z.flattenError(dto.error).fieldErrors
            });
        }

        const result = await this.timeEntryService.clockIn(dto.data);

        if (!result.success) {
            return res.status(400).json({ 
                success: false, 
                message: result.error 
            });
        }

        return res.status(200).json({
            success: true,
        });
    }

    async clockOut(req: Request, res: Response) {
        const dto = timeEntryRequestSchema.safeParse(req.body);

        if (!dto.success) {
            return res.status(400).json({ 
                success: false, 
                message: "Dados de envio inválidos",
                errors: z.flattenError(dto.error).fieldErrors
            });
        }

        const result = await this.timeEntryService.clockOut(dto.data);

        if (!result.success) {
            return res.status(400).json({ 
                success: false, 
                message: result.error 
            });
        }

        return res.status(200).json({
            success: true,
        });
    }
}