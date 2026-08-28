import bcrypt from "bcryptjs";
import { User } from "../model/User.js";
import { UserRepository } from "../repository/user.repository.js";
import jwt from 'jsonwebtoken';
import { env } from "../config/env.js";
import { ConflictError } from "../errors/ConflictError.js";

type Output = 
    | { success: true; role: string; token: string; }
    | { success: false; error: string; }

type MeOutput = 
    | { success: true; user: User}
    | { success: false; }

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
            if(result.error instanceof ConflictError){
                return { success: false, error: result.error.message};
            } else {
                return { success: false, error: "Não foi possível realizar o cadastro. Tente novamente mais tarde."};
            }
        }

        return { 
            success: true,
            role: user.role,
            token: this.generateToken(user),
        };
    }

    public async login(data: { name: string; password: string }): Promise<Output> {
        const response = await this.userRepository.findByName(data.name);

        if (!response.success) {
            return { success: false, error: "Não foi possível realizar o login" };
        } 

        const user = response.data

        let password;
        if(user) {
            password = user.passwordHash;
        } else {
            password = await bcrypt.hash("a", 10);
        }
        
        const isMatch = await bcrypt.compare(data.password, password);

        if(!user || !isMatch) {
            return { success: false, error: "Usuário ou senha inválidos"}
        }

        return { 
            success: true,
            role: user.role,
            token: this.generateToken(user),
         };
    }

    public async me(data: { userId: string }): Promise<MeOutput> {
        const response = await this.userRepository.findById(data.userId);

        if(!response.success) {
            return { success: false }
        }

        const user = response.data;

        return {
            success: true,
            user: user
        }
    }
}