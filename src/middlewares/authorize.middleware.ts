import { ROLES } from "../model/User.js";
import type { Request, Response, NextFunction } from "express";

export function authorize(... allowedRoles: ROLES[]) {
    return (req: Request, res: Response, next: NextFunction): void => {

        if (!allowedRoles.includes(req.user.role as ROLES)) {
            throw new Error("FORBIDDEN: Você não tem permissão para acessar este recurso.");
        }

        next();
    };
}