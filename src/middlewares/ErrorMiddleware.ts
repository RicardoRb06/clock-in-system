import type { Request, Response, NextFunction } from 'express';

export class ErrorMiddleware {
    
    public handle = (error: any, req: Request, res: Response, next: NextFunction): void => {
        
        console.error(`[SERVER ERROR] [${new Date().toISOString()}]:`, error.stack || error.message);

        let statusCode = 500;
        let publicMessage = "Ocorreu um erro interno no servidor. Tente novamente mais tarde.";

        if (error.message && error.message.includes("JWT_SECRET_MISSING")) {
            statusCode = 500;
            publicMessage = "Erro interno de configuração de autenticação do servidor.";
        } 
        else if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
            statusCode = 401; 
            publicMessage = "Token de acesso inválido ou expirado.";
        }
        else if (error.message && !error.message.includes("TOKEN_")) {
            statusCode = error.status || 400;
            publicMessage = error.message;
        }

        res.status(statusCode).json({
            success: false,
            token: null,
            error: publicMessage
        });
    };
}
