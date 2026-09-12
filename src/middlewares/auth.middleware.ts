import type { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { env } from "../config/env.js";

interface AuthJwtPayload {
    id: string;
    name: string;
    role: string;
}

type AuthenticatedRequest = Request & {
    user?: AuthJwtPayload;
};

export class AuthMiddleware {

    private readonly jwtSecret: string;

    constructor(jwtSecret: string) {
        this.jwtSecret = jwtSecret;
    }

    public validate = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
        const token = req.cookies?.auth_token;
        
        if (!token) {
            throw new Error("TOKEN_NOT_PROVIDED: Token de autenticação ausente.");
        }

        const decoded = jwt.verify(token, this.jwtSecret);

        if(typeof decoded !== 'object' || !decoded.id || !decoded.name || !decoded.role) {
            throw new Error("TOKEN_INVALID: O token enviado é inválido.");
        }

        req.user = {
            id: decoded.id,
            name: decoded.name,
            role: decoded.role
        };

        next();
    };
}

export const authMiddleware = new AuthMiddleware(env.JWT_SECRET);
