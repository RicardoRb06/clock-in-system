import { TimeEntryRepository } from "../repository/time.entry.repository.js";
import { TimeEntry } from "../model/TimeEntry.js";

type Output = {
    success: boolean;
    error?: string;
};

export class TimeEntryService {

    private timeEntryRepository: TimeEntryRepository;

    constructor(timeEntryRepository: TimeEntryRepository) {
        this.timeEntryRepository = timeEntryRepository;
    }

    public async clockIn(request: ClockIn): Promise<Output> {
        try{
            const hasOpenEntry = await this.timeEntryRepository.findOpenTimeEntryByUserId(request.userId);
        } catch (error) {
            return {
                success: false,
                error: "Já existe um registro de ponto aberto para este usuário."
            }
        }

        const timeEntry = new TimeEntry(request.userId, new Date());
        await this.timeEntryRepository.create(timeEntry);

        return {
            success: true
        };
    }

    public async clockOut(request: ClockIn): Promise<Output> {
        const openEntry = await this.timeEntryRepository.findOpenTimeEntryByUserId(request.userId);
        
        if(!openEntry) {
            return {
                success: false,
                error: "Não existe um registro de ponto aberto para este usuário."
            }
        }
        
        openEntry.clockOut = new Date();
        await this.timeEntryRepository.update(openEntry);

        return {
            success: true
        };
    }
}