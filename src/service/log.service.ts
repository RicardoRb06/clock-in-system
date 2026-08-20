import type { LogRepository } from "../repository/log.repository.js";

export class LogService {
    private readonly logRepository: LogRepository;

    constructor(logRepository: LogRepository) {
        this.logRepository = logRepository;
    }

    async getAllLogs() {
        
    }

}