import bcrypt from "bcryptjs";
import { User } from "../model/User.js";
import { UserRepository } from "../repository/user.repository.js";
import type { RegisterRequestDto } from "../dto/auth/request/register.request.js";
import type { LoginRequestDto } from "../dto/auth/request/login.request.js";
import jwt from 'jsonwebtoken';
import { env } from "../config/env.js";

type Output = {
    success: boolean;
    token?: string;
    error?: string;
};

export class AuthService {

    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public async register(request: RegisterRequestDto): Promise<Output> {

        if(await this.userRepository.existsByName(request.name)) {
            return { 
                success: false,
                error: "Nome de usuário já existe"
            }
        }

        const hash = await bcrypt.hash(request.password, 10);
        const user = new User(request.name, hash);
        
        await this.userRepository.save(user);

        const payload = {
            id: user.id,
            name: user.name,
            role: user.role
        }

        return { 
            success: true,
            token: jwt.sign(payload, env.JWT_SECRET, { expiresIn: '1h' }),
         };
    }

    public async login(request: LoginRequestDto): Promise<Output> {

        const user = await this.userRepository.findByName(request.name);
        
        if (!user) {
            return { 
                success: false,
                error: "Usuário não encontrado"
            };
        }

        const isMatch = await bcrypt.compare(request.password, user.passwordHash);
        
        if (!isMatch) {
            return { 
                success: false,
                error: "Credenciais incorretas"
            };
        }

        const payload = {
            id: user.id,
            name: user.name,
            role: user.role
        }

        return { 
            success: true,
            token: jwt.sign(payload, env.JWT_SECRET, { expiresIn: '1h' }),
         };
    }
}