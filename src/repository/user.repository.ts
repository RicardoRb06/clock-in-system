import type { PrismaClient } from "@prisma/client";
import { User } from "../model/User.js";
import { type Result, ok, err } from '../utils/result.js';
import { mapError } from "../utils/prisma.errors.js";

export class UserRepository {

    private readonly prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    public async save(user: User): Promise<Result<User, Error>> {
        try {
            const userResponse = await this.prisma.user.create({ data: {
                id: user.id,
                name: user.name,
                passwordHash: user.passwordHash,
                isActive: user.isActive,
                role: user.role,
                category: user.category
            }});
            return ok(User.fromPersistence(userResponse));
        } catch (e) {
            return err(mapError(e));
        }
    }

    public async update(user: User): Promise<Result<null, Error>> {
        try {
            await this.prisma.user.update({ 
                where: { id: user.id },
                data: {
                    name: user.name,
                    passwordHash: user.passwordHash,
                    isActive: user.isActive,
                    roles: user.role,
                    category: user.category
                }
            });
            return ok();
        } catch (e) {
            return err(mapError(e));
        }
    }

    public async delete(id: string): Promise<Result<null, Error>> {
        try {
            await this.prisma.user.delete({ where: { id } });

            return ok();
        } catch (e) {
            return err(mapError(e));
        }
    }

    public async findById(id: string): Promise<Result<User, Error>> {
        try {
            const userResponse = await this.prisma.user.findUnique({ where: { id } });
            
            if(!userResponse){
                return err(new Error("Usuário não encontrado"));
            }

            const user = User.fromPersistence(userResponse);

            return ok(user);
        } catch(e) {
            return err(mapError(e));
        }
    }

    public async findByName(name: string): Promise<Result<User, Error>> {
        try {
            const userResponse = await this.prisma.user.findUnique({ where: { name } });
            
            if(!userResponse){
                return err(new Error("Usuário não encontrado"));
            }

            const user = User.fromPersistence(userResponse);

            return ok(user);
        } catch(e) {
            return err(mapError(e));
        }
    }

    public async findMany(page: number): Promise<Result<User[], Error>> {
        try {
            const userResponse = await this.prisma.user.findMany({
                take: 30,
                skip: (page - 1) * 30,
                orderBy: {
                    name: 'asc'
                }
            })

            if(!userResponse) {
                return err(new Error("Nenhum usuário encontrado"));                
            }

            const users: User[] = userResponse.map((user) => User.fromPersistence(user));

            return ok(users);
        }
        catch (e) {
            return err(mapError(e));
        }
    }
}