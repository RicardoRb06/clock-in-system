import type { User } from "@prisma/client";
import type { UserRepository } from "../repository/user.repository.js";
import { success } from "zod";

export class UserService {

    private userRepository: UserRepository;
    
    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public async update(user: User) {

    }

    public async find(param: string, type: 'name' | 'id') {

        const result = await this.userRepository.find(param, type);

        if(!result.success) {
            return {
                success: false,
                error: result.error.message
            }
        }

        return {
            success: true,
            data: result.data ?? "Nenhum usuário encontrado"
        }
    }

    public async getUsers(page?: number) {
        if(!page) page = 1;

        const result = await this.userRepository.findMany(page);

        if(!result.success) {
            return {
                sucess: false,
                error: result.error.message
            }
        }

        return {
            sucess: true,
            data: result.data ?? "Nenhum usuário encontrado"
        }
    }
}