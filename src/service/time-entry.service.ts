import { TimeEntryRepository } from "../repository/time-entry.repository.js";
import { type Result, ok, err } from '../utils/result.js';
import { TimeEntry } from "../model/TimeEntry.js";

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
}