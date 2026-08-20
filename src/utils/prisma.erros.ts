import { Prisma } from '@prisma/client'
import { DuplicateUserError } from '../errors/DuplicateUserError.js';
import { User } from '../model/User.js';

export function isUniqueViolation(e: unknown): e is Prisma.PrismaClientKnownRequestError {
    return e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002';
}

export function mapUserError(e: unknown, user: User): Error {
    if(isUniqueViolation(e)){
        return new DuplicateUserError(user.name);
    }
    return e as Error;
}