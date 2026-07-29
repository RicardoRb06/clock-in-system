import bcrypt from "bcrypt";
import { User } from "../model/User.js";
import { UserRepository } from "../repository/UserRepository.js";

export class AuthService {

    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public async register(name: string, password: string): Promise<User> {
        const hash = await bcrypt.hash(password, 10);
        const user = new User(name, hash);
        this.userRepository.save(user);
        return user;
    }
}