import { type Request, Response } from 'express';
import { LoginRequestSchema } from "../dto/auth/request/LoginRequest.js";
import { RegisterRequestSchema } from '../dto/auth/request/RegisterRequest.js';

export class AuthController {
    
    async login(req: Request, res: Response) {
        const dto = LoginRequestSchema.parse(req.body);

        const result = await AuthService.login(dto);
            
        if (!result.success) {
            return res.status(401).json({ 
                success: false, 
                message: result.error 
            });
    }

        return res.status(200).json({
            success: true,
            token: result.token,
            tokenType: 'Bearer'
        });
    }

    async register(req: Request, res: Response) {
        const dto = RegisterRequestSchema.parse(req.body);

        const result = await AuthService.register(dto);
            
        if (!result.success) {
            return res.status(401).json({ 
                success: false, 
                message: result.error 
            });
        }

        return res.status(200).json({
            success: true,
            token: result.token,
            tokenType: 'Bearer'
        });
    }
}