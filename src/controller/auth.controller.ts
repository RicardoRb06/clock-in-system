import type { Request, Response } from 'express';
import type { AuthService } from "../service/auth.service.js";
import { complete, fail } from '../utils/result.js';
import { AUTH_COOKIE_NAME, AUTH_COOKIE_OPTIONS } from '../config/cookies.js';
import type { User } from '../model/User.js';


export class AuthController {
    private authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
    }

    public async register(req: Request, res: Response) {
        const result = await this.authService.register(req.body);

        if(!result.success) {
            return fail(res, result.error);
        }

        const [user, token] = result.data as [User, string];

        res.cookie(AUTH_COOKIE_NAME, token, AUTH_COOKIE_OPTIONS);

        return complete(res, 201, { role: user.role });
    }

    public async login(req: Request, res: Response) {
        const result = await this.authService.login(req.body);

        if(!result.success) {
            return fail(res, result.error);
        }

        const [user, token] = result.data as [User, string];

        res.cookie(AUTH_COOKIE_NAME, token, AUTH_COOKIE_OPTIONS);

        return complete(res, 201, { role: user.role });
    }

    public async logout(req: Request, res: Response) {
        const { maxAge, ...clearOptions } = AUTH_COOKIE_OPTIONS;

        res.clearCookie(AUTH_COOKIE_NAME, clearOptions);
        
        return complete(res, 200, { message: "Logout realizado com sucesso" });
    }


    public async me(req: Request, res: Response) {
        const result = await this.authService.me(req.body);

        if(!result.success) {
            return fail(res, result.error);
        }

        if(!result.data) {
            return fail(res, new Error("Erro inesperado no servidor"));
        }

        return complete(res, 201, { name: result.data.name, role: result.data.role, category: result.data.category  });
    }
}