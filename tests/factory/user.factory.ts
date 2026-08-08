import { User, ROLES } from "../../src/model/User.js";

type UserFactoryOverrides = {
    name?: string;
    passwordHash?: string;
    isWorking?: boolean;
    isActive?: boolean;
    role?: ROLES;
};

export function makeUser(overrides: UserFactoryOverrides = {}): User {
    const user = new User(
        overrides.name ?? "Default Name",
        overrides.passwordHash ?? "defaultPasswordHash"
    );

    if (overrides.isWorking !== undefined) user.isWorking = overrides.isWorking;
    if (overrides.isActive !== undefined) user.isActive = overrides.isActive;
    if (overrides.role !== undefined) user.role = overrides.role;

    return user;
}