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
                user_id: timeEntry.userId,
                clock_in: timeEntry.clockIn,
            }
        });
    }

    public async updateClockOut(id: string, clockOut: Date): Promise<void> {
        await this.prisma.timeEntry.update({
            where: { id },
            data: { clock_out: clockOut }
        });
    }

    public async findByUserAndDateRange(userId: string, startDate: Date, endDate: Date): Promise<TimeEntry[]> {
        const timeEntries = await this.prisma.timeEntry.findMany({
            where: {
                userId: userId,
                clockIn: {
                    gte: startDate,
                    lte: endDate
                }
            }
        });
        
        return timeEntries.map(entry => TimeEntry.fromPersistence({
            id: entry.id,
            userId: entry.userId,
            clockIn: entry.clockIn.toISOString(),
            clockOut: entry.clockOut ? entry.clockOut.toISOString() : null
        }));
    }
}
