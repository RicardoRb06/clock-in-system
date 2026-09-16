import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        environment: "node",
        testTimeout: 30_000,
        hookTimeout: 60_000,
        include: ["tests/**/*.test.ts"],
        env: {
            PORT: "8080",
            JWT_SECRET: "test-secret",
            DATABASE_URL: "postgresql://postgres:postgres@localhost:5432/test?schema=public",
            CORS_ALLOWED_ORIGINS: "http://localhost:5173",
            MODERATOR_NAME: "moderator",
            MODERATOR_PASSWORD: "test-password",
            TIME_CLOCK_NAME: "timeClock",
            TIME_CLOCK_PASSWORD: "test-password",
        },
    },
});