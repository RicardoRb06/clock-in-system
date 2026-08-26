import type { User } from "@prisma/client";
import type { UserRepository } from "../repository/user.repository.js";
import { ok, err } from '../utils/result.js';

export class UserService {

    private userRepository: UserRepository;
    
    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public async update(user: User) {

    }

    public async findById(id: string) {

        const result = await this.userRepository.findById(id);

        if(!result.success) return err(result.error);

        return ok(result.data);
    }

    public async findByName(name: string) {

        const result = await this.userRepository.findById(name);

        if(!result.success) return err(result.error);

        return ok(result.data ?? "Nenhum usuário encontrado");
    }

    public async getUsers(page: number = 1) {
        const result = await this.userRepository.findMany(page);

        if(!result.success) return err(result.error);

        return ok(result.data ?? "Nenhum usuário encontrado");
    }
}