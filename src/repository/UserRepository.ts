import { PrismaClient } from "@prisma/client";
import type { User } from "../model/User.js";

const prisma = new PrismaClient();

export class UserRepository {

    public async save(user: User) {
        await prisma.user.create({user});
    }

    public async delete(user: User) {
        await prisma.user.delete({ where: { name: user.name } });
    }

    public async findByName(name: string) {
        return await prisma.user.findUnique({ where: { name } });
    }
}