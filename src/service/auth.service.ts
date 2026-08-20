import bcrypt from "bcryptjs";
import { User } from "../model/User.js";
import { UserRepository } from "../repository/user.repository.js";
import jwt from 'jsonwebtoken';
import { env } from "../config/env.js";
import { DuplicateUserError } from "../errors/DuplicateUserError.js";
import { ErrorMiddleware } from '../middlewares/error.middleware';
import { string, success } from 'zod';

type Output = 
    | { success: boolean; role: string; token: string; }
    | { success: false; error: string; }


export class AuthService {

    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    private generateToken(user: User){
        const payload = {id: user.id, name: user.name, role: user.role}
        return jwt.sign(payload, env.JWT_SECRET, { expiresIn: '1h' });
    }

    public async register(data: { name: string; password: string }): Promise<Output> {
        const hash = await bcrypt.hash(data.password, 10);
        const user = new User(data.name, hash);
        const result = await this.userRepository.save(user);
           
        if(!result.success) {
            let errorMessage;
            if(result.error instanceof DuplicateUserError){
                errorMessage = result.error.message;
            } else {
                errorMessage = "Não foi possível realizar o cadastro. Tente novamente mais tarde."
            }
            return {
                success: false,
                error: errorMessage,
            }
        }

        return { 
            success: true,
            role: user.role,
            token: this.generateToken(user),
        };
    }

    public async login(data: { name: string; password: string }): Promise<Output> {

        const user = await this.userRepository.findByName(data.name);
        
        if (!user) {
            return { 
                success: false,
                error: "Usuário não encontrado"
            };
        }

        const isMatch = await bcrypt.compare(data.password, user.passwordHash);
        
        if (!isMatch) {
            return { 
                success: false,
                error: "Credenciais incorretas"
            };
        }

        return { 
            success: true,
            role: user.role,
            token: this.generateToken(user),
         };
    }
}