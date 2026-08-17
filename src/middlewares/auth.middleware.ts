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

    private readonly jwtSecret: string;

    constructor(jwtSecret: string) {
        this.jwtSecret = jwtSecret;
    }

    public validate = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            throw new Error("TOKEN_NOT_PROVIDED: Cabeçalho de autorização ausente.");
        }

        const [scheme, token] = authHeader.split(' ');

        if (scheme !== 'Bearer' || !token) {
            throw new Error("TOKEN_MALFORMED: O token enviado não segue o formato Bearer.");
        }

        const decoded = jwt.verify(token, this.jwtSecret) as unknown as AuthJwtPayload;

        req.user = {
            id: decoded.id,
            name: decoded.name,
            role: decoded.role
        };

        next();
    };
}
