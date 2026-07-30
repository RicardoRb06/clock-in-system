import { prisma } from "../database/prisma.js";
import type { User } from "../model/User.js";

export class UserRepository {

    public async save(user: User) {
        await prisma.users.create({ data: {
            name: user.name,
            passwordHash: user.passwordHash,
            isActive: user.isActive,
            roles: user.role
        }});
    }

    public async delete(user: User) {
        await prisma.users.delete({ where: { name: user.name } });
    }

    public async findByName(name: string) {
        return await prisma.users.findUnique({ where: { name } });
    }
}