import type { Request, Response } from 'express';
import { LoginRequestSchema } from "../dto/auth/request/LoginRequest.js";
import { RegisterRequestSchema } from '../dto/auth/request/RegisterRequest.js';
import { AuthService } from '../service/AuthService.js';

export class AuthController {
    
    private authService: AuthService;
    
    constructor(authService: AuthService) {
        this.authService = authService;
    }

    async login(req: Request, res: Response) {
        const dto = LoginRequestSchema.parse(req.body);

        const result = await this.authService.login(dto);
            
        if (!result.success) {
            return res.status(400).json({ 
                success: false, 
                message: result.error 
            });
        }

        res.cookie('auth_token', result.token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 3600000
        });

        return res.status(201).json({
            success: true,
            tokenType: 'Bearer'
        });
    }

    async register(req: Request, res: Response) {
        const dto = RegisterRequestSchema.parse(req.body);

        const result = await this.authService.register(dto);
            
        if (!result.success) {
            return res.status(400).json({ 
                success: false, 
                message: result.error 
            });
        }

        res.cookie('auth_token', result.token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 3600000
        });


        return res.status(201).json({
            success: true,
            tokenType: 'Bearer'
        });
    }
}