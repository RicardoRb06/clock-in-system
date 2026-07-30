import { PostgreSqlContainer, StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { execSync } from 'child_process';
import { PrismaClient } from '@prisma/client';

let container: StartedPostgreSqlContainer;
let prisma: PrismaClient;

export async function startDatabase() {
    const container = await new PostgreSqlContainer("postgres:15.3").start();
    
    const databaseUrl = container.getConnectionUri();   

    execSync(`pnpm dlx prisma migrate deploy`, {
        env: {
            ...process.env,
            DATABASE_URL: databaseUrl,
        },
    });

    prisma = new PrismaClient({
        datasources: { db: { url: databaseUrl } },
    });


    return { prisma, container };
}

export async function stopDatabase() {  
    await prisma?.$disconnect();
    await container?.stop();
}