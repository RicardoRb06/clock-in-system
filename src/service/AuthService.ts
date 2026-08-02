import bcrypt from "bcryptjs";
import { User } from "../model/User.js";
import { UserRepository } from "../repository/UserRepository.js";
import type { RegisterRequestDto } from "../dto/auth/request/RegisterRequest.js";
import type { RegisterResponseDto } from "../dto/auth/response/RegisterResponse.js";
import type { LoginRequestDto } from "../dto/auth/request/LoginRequest.js";
import type { LoginResponseDto } from "../dto/auth/response/LoginResponse.js";
import jwt from 'jsonwebtoken';
import { env } from "../config/env.js";

export class AuthService {

    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public async register(request: RegisterRequestDto): Promise<RegisterResponseDto> {

        if(await this.userRepository.existsByName(request.name)) {
            return { 
                success: false,
                token: null,
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
            error: null
         };
    }

    public async login(request: LoginRequestDto): Promise<LoginResponseDto> {

        const user = await this.userRepository.findByName(request.name);
        
        if (!user) {
            return { 
                success: false,
                token: null,
                error: "Usuário não encontrado"
            };
        }

        const isMatch = await bcrypt.compare(request.password, user.passwordHash);
        
        if (!isMatch) {
            return { 
                success: false,
                token: null,
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
            error: null
         };
    }
}