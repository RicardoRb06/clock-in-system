import type { UserRepository } from "../repository/user.repository.js";
import type { LoginRequest, RegisterRequest } from "../dto/auth.dto.js";
import { type Result, ok, err } from '../utils/result.js';
import { env } from "../config/env.js";
import { User } from "../model/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { userRepository } from "../repository/user.repository.js";

export class AuthService {

    private userRepository: UserRepository;
    
    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    private generateToken(user: User): string {
        const payload = {id: user.id, name: user.name, role: user.role}
        return jwt.sign(payload, env.JWT_SECRET, { expiresIn: '1h' });
    }

    public async register(name: string, password: string, category?: string): Promise<Result<string, Error>> {
        const hash = await bcrypt.hash(password, 10);
        const user = new User(name, hash, category);
        const result = await this.userRepository.save(user);

        if(!result.success) return err(result.error);

        const token = this.generateToken(user);

        return ok(token);
    }

    public async login(name: string, password: string): Promise<Result<[User, string], Error>> {
        const result = await this.userRepository.findByName(name);
        if (!result.success) return err(result.error);

        const user = result.data;

        if (!user) {
            return err(new Error("Usuário ou senha incorretos"));
        }

        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            return err(new Error("Usuário ou senha incorretos"));
        }

        const token = this.generateToken(user);

        return ok([user, token]);
    }


    public async me(userId: string): Promise<Result<User, Error>> {
        const result = await this.userRepository.findById(userId);

        if (!result.success) return err(result.error);

        const user = result.data;

        if (!user) {
            return err(new Error("Usuário não encontrado"));
        }

        return ok(user);
    }
}

export const authService = new AuthService(userRepository);