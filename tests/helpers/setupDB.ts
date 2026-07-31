import { PostgreSqlContainer, StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { execSync } from 'child_process';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

let container: StartedPostgreSqlContainer | undefined;
let prisma: PrismaClient | undefined;

export async function startDatabase() {
    container = await new PostgreSqlContainer("postgres:15.3").start();
    
    const databaseUrl = container.getConnectionUri();   

    execSync(`pnpm exec prisma migrate deploy`, {
        env: {
            ...process.env,
            DATABASE_URL: databaseUrl,
        },
    });

    const adapter = new PrismaPg({connectionString: databaseUrl});
    prisma = new PrismaClient({ adapter });

    return { prisma, container };
}

export async function stopDatabase() {  
    await prisma?.$disconnect();
    await container?.stop();
}