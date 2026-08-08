import type { Request, Response, NextFunction } from "express";
import * as jwt from 'jsonwebtoken';

interface AuthJwtPayload {
    id: string;
    name: string;
    role: string;
}

type AuthenticatedRequest = Request & {
    user?: AuthJwtPayload;
};

export class AuthMiddleware {
    constructor(private readonly jwtSecret: string) {}

    public validate = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            throw new Error("TOKEN_NOT_PROVIDED: Cabeçalho de autorização ausente.");
        }

        const [scheme, token] = authHeader.split(' ');

        if (scheme !== 'Bearer' || !token) {
            throw new Error("TOKEN_MALFORMED: O token enviado não segue o formato Bearer.");
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
