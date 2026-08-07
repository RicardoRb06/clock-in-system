import { beforeAll, afterAll, afterEach, describe, it, expect } from 'vitest';
import { startDatabase, stopDatabase } from '../helpers/setupDB.js';
import { TimeEntryRepository } from '../../src/repository/time-entry.repository.js';
import { UserRepository } from '../../src/repository/user.repository.js';
import type { PrismaClient } from '@prisma/client';
import { makeTimeEntry } from '../factory/time.entry.factory.js';
import { makeUser } from '../factory/user.factory.js';


let timeEntryRepository: TimeEntryRepository;
let userRepository: UserRepository;
let prisma: PrismaClient;

beforeAll(async () => {
    const setup = await startDatabase();
    prisma = setup.prisma;
    timeEntryRepository = new TimeEntryRepository(prisma);
    userRepository = new UserRepository(prisma);
}, 60000);

afterAll(async () => {
    await stopDatabase();
});

afterEach(async () => {
    await prisma.timeEntry.deleteMany();
    await prisma.user.deleteMany();
});

describe("TimeEntryRepository", () => {
    it("should not allow two open clock-ins for the same user", async () => {
        let user = makeUser();
        await userRepository.save(user);

        let timeEntry1 = makeTimeEntry({ userId: user.id, clockIn: new Date() });
        let timeEntry2 = makeTimeEntry({ userId: user.id, clockIn: new Date() });

        await timeEntryRepository.create(timeEntry1);
        await expect(timeEntryRepository.create(timeEntry2)).rejects.toThrow();
    });
});