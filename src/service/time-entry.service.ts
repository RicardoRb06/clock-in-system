import { TimeEntryRepository } from "../repository/time-entry.repository.js";
import { type Result, ok, err } from '../utils/result.js';
import { TimeEntry } from "../model/TimeEntry.js";
import { timeEntryRepository } from "../repository/time-entry.repository.js";

export class TimeEntryService {

    private timeEntryRepository: TimeEntryRepository;

    constructor(timeEntryRepository: TimeEntryRepository) {
        this.timeEntryRepository = timeEntryRepository;
    }

    public async clockIn(data: { userId: string }): Promise<Result<void, Error>> {
        const findResult = await this.timeEntryRepository.findOpenTimeEntryByUserId(data.userId);

        if (!findResult.success) return err(findResult.error);

        if (findResult.data) {
            return err(new Error("Já existe um registro de ponto aberto para este usuário."));
        }

        const timeEntry = new TimeEntry(data.userId, new Date());
        const createResult = await this.timeEntryRepository.create(timeEntry);

        if (!createResult.success) return err(createResult.error);

        return ok();
    }

    public async clockOut(data: { userId: string }): Promise<Result<void, Error>> {
        const findResult = await this.timeEntryRepository.findOpenTimeEntryByUserId(data.userId);

        if (!findResult.success) return err(findResult.error);

        const openEntry = findResult.data;

        if(!openEntry) {
            return err(new Error("Não existe um registro de ponto aberto para este usuário."));
        }

        openEntry.clockOut = new Date();
        const updateResult = await this.timeEntryRepository.update(openEntry);

        if (!updateResult.success) return err(updateResult.error);

        return ok();
    }

    public async getMonthlyTotal(data: { userId: string; year: number; month: number }): Promise<Result<{ userId: string; year: number; month: number; totalMinutes: number; totalHours: number }, Error>> {
        const { userId, year, month } = data;

        if (!Number.isInteger(year) || !Number.isInteger(month) || month < 1 || month > 12) {
            return err(new Error("Ano ou mês inválido."));
        }

        const startDate = new Date(Date.UTC(year, month - 1, 1, 3, 0, 0, 0));
        const endDate = new Date(Date.UTC(year, month, 1, 3, 0, 0, 0) - 1);

        const findResult = await this.timeEntryRepository.findByUserAndDateRange(userId, startDate, endDate);

        if (!findResult.success) return err(findResult.error);
        
        const entries = findResult.data ?? [];

        const totalMs = entries.reduce((acc, entry) => {
            if (!entry.clockOut) return acc;
            return acc + (entry.clockOut.getTime() - entry.clockIn.getTime());
        }, 0);
        const totalMinutes = Math.floor(totalMs / 1000 / 60);

        return ok({
            userId,
            year,
            month,
            totalMinutes,
            totalHours: Math.round((totalMinutes / 60) * 100) / 100
        });
    }
}

export const timeEntryService = new TimeEntryService(timeEntryRepository);