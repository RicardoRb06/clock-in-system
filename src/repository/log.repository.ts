import type { PrismaClient } from "@prisma/client";
import type { AuditLog } from "../model/AuditLog.js";

export class LogRepository {
    private readonly prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    public async save(log: AuditLog) {
        await this.prisma.auditLog.create({ data: {
            id: log.id,
            userId: log.userId,
            action: log.action,
            dateHour: log.dateHour
        }});
    }

    public async getAll(id: string) {
        await this.prisma.auditLog.findMany();
    }
}