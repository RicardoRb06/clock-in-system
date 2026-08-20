import type { PrismaClient } from "@prisma/client";

export class LogRepository {
    private readonly prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    public async getAll(id: string) {}
}