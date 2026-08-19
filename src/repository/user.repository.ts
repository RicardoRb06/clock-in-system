import type { PrismaClient } from "@prisma/client";
import { User } from "../model/User.js";

export class UserRepository {

    private readonly prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    public async save(user: User) {
        await this.prisma.user.create({ data: {
            id: user.id,
            name: user.name,
            passwordHash: user.passwordHash,
            isActive: user.isActive,
            role: user.role,
            category: user.category
        }});
    }

    public async update(user: User) {
        await this.prisma.user.update({ 
            where: { id: user.id },
            data: {
                name: user.name,
                passwordHash: user.passwordHash,
                isActive: user.isActive,
                roles: user.role,
                category: user.category
            }
        });
    }

    public async delete(id: string) {
        await this.prisma.user.delete({ where: { id } });
    }

    public async findByName(name: string) {
        const userResponse = await this.prisma.user.findUnique({ where: { name } });
        if(!userResponse) {
            return null;
        }
        return User.fromPersistence(userResponse);
    }

    public async findById(id: string) {
        const userResponse = await this.prisma.user.findUnique({ where: { id } });
        if(!userResponse) {
            return null;
        }
        return User.fromPersistence(userResponse);
    }

    public async existsByName(name: string) {
        const userResponse = await this.prisma.user.findUnique({ where: { name } });
        return !!userResponse;
    }
}