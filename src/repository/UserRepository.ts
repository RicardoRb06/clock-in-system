import type { PrismaClient } from "@prisma/client";
import type { User } from "../model/User.js";

export class UserRepository {

    private readonly prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    public async save(user: User) {
        await this.prisma.user.create({ data: {
            name: user.name,
            passwordHash: user.passwordHash,
            isActive: user.isActive,
            roles: user.role
        }});
    }

    public async delete(user: User) {
        await this.prisma.user.delete({ where: { name: user.name } });
    }

    public async findByName(name: string) {
        return await this.prisma.user.findUnique({ where: { name } });
    }
}