import { PrismaClient } from "@prisma/client";
import { TimeEntry } from "../model/TimeEntry.js";
import { type Result, ok, err } from '../utils/result.js';
import { mapError } from "../utils/prisma.errors.js";

export class TimeEntryRepository {

    private readonly prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    public async create(timeEntry: TimeEntry): Promise<Result<null, Error>> {
        try {
            await this.prisma.timeEntry.create({
                data: {
                    id: timeEntry.id,
                    userId: timeEntry.userId,
                    clockIn: timeEntry.clockIn,
                }
            });

            return ok();
        } catch (e) {
            return err(mapError(e));
        }
    }

    public async update(timeEntry: TimeEntry): Promise<Result<null, Error>> {
        try {
            await this.prisma.timeEntry.update({
                where: { id: timeEntry.id },
                data: {
                    userId: timeEntry.userId,
                    clockIn: timeEntry.clockIn,
                    clockOut: timeEntry.clockOut
                }
            });

            return ok();
        } catch (e) {
            return err(mapError(e));
        }
    }

    public async findByUserAndDateRange(userId: string, startDate: Date, endDate: Date): Promise<Result<TimeEntry[], Error>> {
        try {
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

            const entries = timeEntries.map(entry => TimeEntry.fromPersistence({
                id: entry.id,
                userId: entry.userId,
                clockIn: entry.clockIn,
                clockOut: entry.clockOut ? entry.clockOut : null
            }));

            return ok(entries);
        } catch (e) {
            return err(mapError(e));
        }
    }

    public async findOpenTimeEntryByUserId(userId: string): Promise<Result<TimeEntry | null, Error>> {
        try {
            const openEntry = await this.prisma.timeEntry.findFirst({
                where: {
                    userId: userId,
                    clockOut: null
                }
            });

            return ok(openEntry ? TimeEntry.fromPersistence(openEntry) : null);
        } catch (e) {
            return err(mapError(e));
        }
    }
}
