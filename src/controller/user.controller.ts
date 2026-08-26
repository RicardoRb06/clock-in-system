import type { Request, Response } from 'express';
import type { UserService } from "../service/user.service.js";

export class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    public async findById(req: Request, res: Response) {
        const result = await this.userService.findById(req.body.id);

        if(!result.success) {
            return res.status(400).json({
                success: false,
                message: result.error
            })
        }

        return res.status(201).json({
            success: true,
            data: result.data,
        });
    }

    public async findByName(req: Request, res: Response) {
        const result = await this.userService.findByName(req.body.name);

        if(!result.success) {
            return res.status(400).json({
                success: false,
                message: result.error
            })
        }

        return res.status(201).json({
            success: true,
            data: result.data,
        });
    }

    public async getUsers(req: Request, res: Response) {
        if(!req.body.page) {
            req.body.page = 1;
        }

        const result = await this.userService.getUsers(req.body.page);

        if (!result.success) {
            return res.status(400).json({ 
                success: false, 
                message: result.error 
            });
        }

        return res.status(201).json({
            success: true,
            data: result.data,
        });
    }
}