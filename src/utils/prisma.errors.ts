import { Prisma } from "@prisma/client";
import { ConflictError } from "../errors/ConflictError.js";
import { User } from "../model/User.js";

const ERROR_MAP: Record<string, new () => Error> = {
  P2002: ConflictError,
};

export function mapError(e: unknown): Error {
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    const ErrorClass = ERROR_MAP[e.code];

    if (ErrorClass) {
      return new ErrorClass();
    }
  }

  return e instanceof Error ? e : new Error(String(e));
}