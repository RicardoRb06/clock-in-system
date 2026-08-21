import type { Request, Response } from 'express';
import { LoginRequestSchema } from "../dto/auth/request/login.request.js";
import { RegisterRequestSchema } from '../dto/auth/request/register.request.js';
import { AuthService } from '../service/auth.service.js';
import { z } from 'zod';
import { AUTH_COOKIE_NAME, AUTH_COOKIE_OPTIONS } from '../config/cookies.js';

export class AuthController {
    
    private authService: AuthService;
    
    constructor(authService: AuthService) {
        this.authService = authService;
    }

    async register(req: Request, res: Response) {
        const result = await this.authService.register(req.body);
            
        if (!result.success) {
            return res.status(400).json({ 
                success: false, 
                message: result.error 
            });
        }

        res.cookie(AUTH_COOKIE_NAME, result.token, AUTH_COOKIE_OPTIONS);

        return res.status(201).json({
            success: true,
            role: result.role,
        });
    }

    async login(req: Request, res: Response) {
        const result = await this.authService.login(req.body);
            
        if (!result.success) {
            return res.status(400).json({ 
                success: false, 
                message: result.error 
            });
        }

        res.cookie(AUTH_COOKIE_NAME, result.token, AUTH_COOKIE_OPTIONS);

        return res.status(200).json({
            success: true,
            role: result.role,
        });
    }
}