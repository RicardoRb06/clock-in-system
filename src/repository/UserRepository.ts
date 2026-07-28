import { PrismaClient } from "@prisma/client";
import type { User } from "../model/User.js";

const prisma = new PrismaClient();

export class UserRepository {

    public async save(user: User) {
        await prisma.user.create({
            data: {
                id: user.id,
                name: user.name,
                passwordHash: user.passwordHash,
                isWorking: user.isWorking,
                isActive: user.isActive,
                role: user.role
            }
        });
    }

    
}