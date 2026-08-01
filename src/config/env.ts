import { z } from "zod";

const envSchema = z.object({
    JWT_SECRET: z.string().min(1, "JWT_SECRET_MISSING: A chave secreta do JWT não foi carregada do arquivo .env."),
    DATABASE_URL: z.string().min(1, "DATABASE_URL_MISSING: A URL do banco de dados não foi carregada do arquivo .env."),
});

export const env = envSchema.parse(process.env);