import { TimeEntryRepository } from "../repository/time.entry.repository.js";
import { TimeEntry } from "../model/TimeEntry.js";

type ClockInInput = {
    userId: string;
};

export class TimeEntryService {

    private timeEntryRepository: TimeEntryRepository;

    constructor(timeEntryRepository: TimeEntryRepository) {
        this.timeEntryRepository = timeEntryRepository;
    }

    public async clockIn(request: ClockInInput): Promise<void> {
        const hasOpenEntry = await this.timeEntryRepository.findOpenTimeEntryByUserId(request.userId);
        if (!hasOpenEntry) {
            throw new Error("Já existe um registro de ponto aberto para este usuário.");
        }

        const timeEntry = new TimeEntry(request.userId, new Date());
        await this.timeEntryRepository.create(timeEntry);
    }
}