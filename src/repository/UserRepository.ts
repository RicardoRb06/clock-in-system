import { PrismaClient } from "@prisma/client";
import type { User } from "../model/User.js";

const prisma = new PrismaClient();

export class UserRepository {

    public async save(user: User) {
        await prisma.user.create({user});
    }

    public async findByName(name: string) {
        return await prisma.user.findUnique({ where: { name } });
    }
}