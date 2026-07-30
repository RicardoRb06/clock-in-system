import { PostgreSqlContainer, StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { Pool } from "pg";

export async function startDatabase() {
    const container = await new PostgreSqlContainer("postgres:15.3").start();
    const pool = new Pool({ connectionString: container.getConnectionUri() });
    return { container, pool };
}

export async function stopDatabase(container: StartedPostgreSqlContainer, pool: Pool) {  
    await pool.end();
    await container.stop();
}