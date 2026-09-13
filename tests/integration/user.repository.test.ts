import { beforeAll, afterAll, afterEach, describe, it, expect } from 'vitest';
import { startDatabase, stopDatabase } from '../helpers/setupDB.js';
import { UserRepository } from '../../src/repository/user.repository.js';
import type { PrismaClient } from '@prisma/client';
import { makeUser } from '../factory/user.factory.js';
import { ROLES, CATEGORY } from '../../src/model/User.js';

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
    describe("save", () => {
        it("should save a user", async () => {
            const user = makeUser({ name: "Ricardo" });

            const saveResult = await repository.save(user);
            expect(saveResult.success).toBe(true);

            const foundResult = await repository.findByName(user.name);
            expect(foundResult.success).toBe(true);
            if (foundResult.success) {
                expect(foundResult.data).toEqual(user);
            }
        });

        it("should return an error when saving a user with a duplicate name", async () => {
            const user = makeUser({ name: "Ricardo" });
            await repository.save(user);

            const duplicate = makeUser({ name: "Ricardo" });
            const result = await repository.save(duplicate);

            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.name).toBe("ConflictError");
            }
        });
    });

    describe("findByName", () => {
        it("should return an error when user is not found", async () => {
            const result = await repository.findByName("NonExistentUser");

            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.message).toBe("Usuário não encontrado");
            }
        });
    });

    describe("findById", () => {
        it("should find a user by id", async () => {
            const user = makeUser({ name: "Ricardo" });
            await repository.save(user);

            const result = await repository.findById(user.id);

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data).toEqual(user);
            }
        });

        it("should return an error when user id does not exist", async () => {
            const result = await repository.findById("non-existent-id");

            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.message).toBe("Usuário não encontrado");
            }
        });
    });

    describe("update", () => {
        it("should persist changes made to a user", async () => {
            const user = makeUser({ name: "Ricardo" });
            await repository.save(user);

            user.name = "Ricardo Fernandes";
            user.passwordHash = "newPasswordHash";
            user.isActive = false;
            user.role = ROLES.ADMIN;
            user.category = CATEGORY.SUMO;

            const updateResult = await repository.update(user);
            expect(updateResult.success).toBe(true);

            const foundResult = await repository.findById(user.id);
            expect(foundResult.success).toBe(true);
            if (foundResult.success) {
                expect(foundResult.data).toEqual(user);
            }
        });
    });

    describe("delete", () => {
        it("should delete a user", async () => {
            const user = makeUser({ name: "Ricardo" });
            await repository.save(user);

            const deleteResult = await repository.delete(user.id);
            expect(deleteResult.success).toBe(true);

            const foundResult = await repository.findByName(user.name);
            expect(foundResult.success).toBe(false);
        });

        it("should return an error when deleting a non-existent user", async () => {
            const result = await repository.delete("non-existent-id");

            expect(result.success).toBe(false);
        });
    });

    describe("findMany", () => {
        it("should only return active users with role user or admin, ordered by name", async () => {
            await repository.save(makeUser({ name: "Bruno", role: ROLES.USER }));
            await repository.save(makeUser({ name: "Amanda", role: ROLES.ADMIN }));
            await repository.save(makeUser({ name: "Carlos", role: ROLES.USER, isActive: false }));
            await repository.save(makeUser({ name: "Daniela", role: ROLES.MODERATOR }));
            await repository.save(makeUser({ name: "Eduardo", role: ROLES.TIME_CLOCK }));

            const result = await repository.findMany(1);

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data!.map((user) => user.name)).toEqual(["Amanda", "Bruno"]);
            }
        });

        it("should paginate results by 30 per page", async () => {
            for (let i = 0; i < 31; i++) {
                await repository.save(makeUser({ name: `User${i.toString().padStart(2, "0")}` }));
            }

            const firstPage = await repository.findMany(1);
            const secondPage = await repository.findMany(2);

            expect(firstPage.success).toBe(true);
            expect(secondPage.success).toBe(true);
            if (firstPage.success && secondPage.success) {
                expect(firstPage.data!).toHaveLength(30);
                expect(secondPage.data!).toHaveLength(1);
            }
        });
    });
});
