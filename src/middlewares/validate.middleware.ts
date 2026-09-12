import { z, type ZodType } from "zod";
import type { Request, Response, NextFunction } from "express";

export function validate(schema: ZodType) {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);

        if(!result.success) {
            return res.status(400).json({
                success: false,
                message: "Dados de envio inválidos",
                errors: z.flattenError(result.error).fieldErrors,
            });
        }

        next();
    }
}