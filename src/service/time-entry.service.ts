import { TimeEntryRepository } from "../repository/time-entry.repository.js";
import { TimeEntry } from "../model/TimeEntry.js";

type ClockIn = {
    userId: string;
};

export class TimeEntryService {

    private timeEntryRepository: TimeEntryRepository;

    constructor(timeEntryRepository: TimeEntryRepository) {
        this.timeEntryRepository = timeEntryRepository;
    }

    public async clockIn(request: ClockIn): Promise<void> {
        const hasOpenEntry = await this.timeEntryRepository.findOpenTimeEntryByUserId(request.userId);
        if (!hasOpenEntry) {
            throw new Error("Já existe um registro de ponto aberto para este usuário.");
        }

        const timeEntry = new TimeEntry(request.userId, new Date());
        await this.timeEntryRepository.create(timeEntry);
    }

    public async clockOut(request: ClockIn): Promise<void> {
        const openEntry = await this.timeEntryRepository.findOpenTimeEntryByUserId(request.userId);
        
        if(!openEntry) {
            throw new Error("Não existe um registro de ponto aberto para este usuário.");
        }
        if (openEntry.length > 1) {
            throw new Error("Há múltiplos registros de ponto abertos para este usuário.");
        }

        await this.timeEntryRepository.updateClockOut(openEntry[0].id, new Date());
    }
}