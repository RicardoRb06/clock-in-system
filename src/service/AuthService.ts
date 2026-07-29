import bcrypt from "bcrypt";
import { User } from "../model/User.js";
import { UserRepository } from "../repository/UserRepository.js";
import type { RegisterRequestDto } from "../dto/auth/request/RegisterRequest.js";
import type { RegisterResponseDto } from "../dto/auth/response/RegisterResponse.js";
import type { LoginRequestDto } from "../dto/auth/request/LoginRequest.js";
import type { LoginResponseDto } from "../dto/auth/response/LoginResponse.js";

export class AuthService {

    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public async register(request: RegisterRequestDto): Promise<RegisterResponseDto> {
        const hash = await bcrypt.hash(request.password, 10);
        const user = new User(request.name, hash);
        this.userRepository.save(user);
        return { name: user.name };
    }

    public async login(request: LoginRequestDto): Promise<LoginResponseDto> {
        const user = await this.userRepository.findByName(request.name);
        if (!user) {
            throw new Error("User not found");
        }
        const isMatch = await bcrypt.compare(request.password, user.password);
        if (!isMatch) {
            throw new Error("Invalid credentials");
        }
        return null;
    }
}