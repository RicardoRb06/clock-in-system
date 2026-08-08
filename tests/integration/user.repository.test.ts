import { beforeAll, afterAll, afterEach, describe, it, expect } from 'vitest';
import { startDatabase, stopDatabase } from '../helpers/setupDB.js';
import { UserRepository } from '../../src/repository/user.repository.js';
import type { PrismaClient } from '@prisma/client';
import { makeUser } from '../factory/user.factory.js';

let repository: UserRepository;
let prisma: PrismaClient;

beforeAll(async () => {
    const setup = await startDatabase();
    prisma = setup.prisma;
    repository = new UserRepository(prisma);
}, 60000);

afterAll(async () => {
    await stopDatabase();
});

afterEach(async () => {
    await prisma.user.deleteMany();
});
 
describe("UserRepository", () => {
    it("should save a user", async () => {
        const user = makeUser({name: "Ricardo"});

        await repository.save(user);
        const foundUser = await repository.findByName(user.name);
        expect(foundUser).toEqual(user);
    });

    it("should return null when user is not found", async () => {
        const foundUser = await repository.findByName("NonExistentUser");
        expect(foundUser).toBeNull();
    });

    it("should delete a user", async () => {
        const user = makeUser({name: "Ricardo"});
        await repository.save(user);
        await repository.delete(user.id);
        const foundUser = await repository.findByName(user.name);
        expect(foundUser).toBeNull();
    });
});