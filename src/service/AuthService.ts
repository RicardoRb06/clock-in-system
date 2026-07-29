import bcrypt from "bcrypt";
import { User } from "../model/User.js";
import { UserRepository } from "../repository/UserRepository.js";
import type { RegisterRequestDto } from "../dto/auth/request/RegisterRequest.js";
import type { RegisterResponseDto } from "../dto/auth/response/RegisterResponse.js";

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
}