import bcrypt from 'bcryptjs';
import { prisma } from "../src/database/prisma.js"
import { env } from "../src/config/env.js";
import { ROLES, User } from '../src/model/User.js';

async function main() {
    const ModeratorPasswordHash = await bcrypt.hash(env.MODERATOR_PASSWORD, 10);
    const TimeClockPasswordHash = await bcrypt.hash(env.TIME_CLOCK_PASSWORD, 10);

    const moderator = new User("moderator", ModeratorPasswordHash);
    const timeClock = new User("timeClock", TimeClockPasswordHash);
    moderator.role = ROLES.MODERATOR;
    timeClock.role = ROLES.TIME_CLOCK;

    await prisma.user.upsert({
        where: {
            name: moderator.name,
        },
        update: {},
        create: {
            id: moderator.id,
            name: moderator.name,
            passwordHash: moderator.passwordHash,
            isActive: moderator.isActive,
            role: moderator.role,
            category: moderator.category,
        },
    });

    await prisma.user.upsert({
        where: {
            name: timeClock.name
        },
        update: {},
        create: {
            id: timeClock.id,
            name: timeClock.name,
            passwordHash: timeClock.passwordHash,
            isActive: timeClock.isActive,
            role: timeClock.role,
            category: timeClock.category,
        },
    });
}

main().catch(console.error).finally(() => prisma.$disconnect());