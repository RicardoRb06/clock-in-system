import type { Request, Response } from 'express';
import type { TimeEntryService } from "../service/time-entry.service.js";
import { TimeEntryRequestSchema } from '../dto/time-entry/request/time-entry.request.js';
import { z } from 'zod';

export class TimeEntryController {
    private timeEntryService: TimeEntryService;

    constructor(timeEntryService: TimeEntryService) {
        this.timeEntryService = timeEntryService;
    }

    async clockIn(req: Request, res: Response) {
        const dto = TimeEntryRequestSchema.safeParse(req.body); 

        if(!dto.success) {
            return res.status(400).json({
                success: false,
                message: "Dados de envio inválidos",
                errors: z.flattenError(dto.error).fieldErrors
            })
        }

        const result = await this.timeEntryService.clockIn(dto.data);

        if (!result.success) {
            return res.status(400).json({ 
                success: false, 
                message: result.error 
            });
        }

        return {
            success: true,
            message: "Ponto aberto!",
            error: null
        }
        
    }
}