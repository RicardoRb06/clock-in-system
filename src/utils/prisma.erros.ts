import { Prisma } from '@prisma/client'

export function isUniqueViolation(e: unknown): e is Prisma.PrismaClientKnownRequestError {
    return e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002';
}