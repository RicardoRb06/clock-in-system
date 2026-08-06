import { PrismaClient } from "@prisma/client";
import { TimeEntry } from "../model/TimeEntry.js";

export class TimeEntryRepository {

    private readonly prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    public async create(timeEntry: TimeEntry): Promise<void> {
        await this.prisma.timeEntry.create({
            data: {
                id: timeEntry.id,
                userId: timeEntry.userId,
                clockIn: timeEntry.clockIn,
            }
        });
    }

    public async updateClockOut(id: string, clockOut: Date): Promise<void> {
        await this.prisma.timeEntry.update({
            where: { id },
            data: { clockOut: clockOut }
        });
    }

    public async findByUserAndDateRange(userId: string, startDate: Date, endDate: Date): Promise<TimeEntry[]> {
        const timeEntries = await this.prisma.timeEntry.findMany({
            where: {
                userId: userId,
                clockIn: {
                    gte: startDate,
                    lte: endDate
                },
                clockOut: {
                    not: null
                }
            }
        });

        return timeEntries.map(entry => TimeEntry.fromPersistence({
            id: entry.id,
            userId: entry.userId,
            clockIn: entry.clockIn,
            clockOut: entry.clockOut ? entry.clockOut : null
        }));
    }

    public async findOpenTimeEntryByUserId(userId: string): Promise<TimeEntry | null> {
        const openEntry = await this.prisma.timeEntry.findFirst({
            where: {
                userId: userId,
                clockOut: null
            }
        });

        return openEntry ? TimeEntry.fromPersistence(openEntry) : null;
    }
}
