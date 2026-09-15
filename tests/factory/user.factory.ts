import { User, ROLES, CATEGORY } from "../../src/model/User.js";

type UserFactoryOverrides = {
    id?: string;
    name?: string;
    passwordHash?: string;
    isWorking?: boolean;
    isActive?: boolean;
    role?: ROLES;
    category?: CATEGORY | null;
};

export function makeUser(overrides: UserFactoryOverrides = {}): User {
    const user = new User(
        overrides.name ?? "Default Name",
        overrides.passwordHash ?? "defaultPasswordHash"
    );

    if (overrides.id) user.id = overrides.id;
    if (overrides.isWorking !== undefined) user.isWorking = overrides.isWorking;
    if (overrides.isActive !== undefined) user.isActive = overrides.isActive;
    if (overrides.role !== undefined) user.role = overrides.role;
    if (overrides.category !== undefined) user.category = overrides.category;

    return user;
}