import type { Request, Response } from 'express';
import type { UserService } from "../service/user.service.js";
import { complete, fail } from '../utils/result.js';

export class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    public async findById(req: Request, res: Response) {
        const result = await this.userService.findById(req.body.id);

        if(!result.success) {
            return fail(res, result.error);
        }

        return complete(res, 201, result.data);
    }

    public async findByName(req: Request, res: Response) {
        const result = await this.userService.findByName(req.body.name);

        if(!result.success) {
            return fail(res, result.error);
        }

        return complete(res, 201, result.data);
    }

    public async getUsers(req: Request, res: Response) {
        const result = await this.userService.getUsers();

        if(!result.success) {
            return fail(res, result.error);
        }

        return complete(res, 201, result.data);
    }
}