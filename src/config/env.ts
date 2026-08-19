import { boolean, z } from "zod";

const envSchema = z.object({
    PORT: z.string().min(1, "PORT_MISSING: A porta não foi carregada do arquivo .env."),
    JWT_SECRET: z.string().min(1, "JWT_SECRET_MISSING: A chave secreta do JWT não foi carregada do arquivo .env."),
    DATABASE_URL: z.string().min(1, "DATABASE_URL_MISSING: A URL do banco de dados não foi carregada do arquivo .env."),
    CORS_ALLOWED_ORIGINS: z.string().min(1, "CORS_ALLOWED_ORIGINS_MISSING: As origns do CORS não foram carregadas do arquivo .env")
    .transform((val) => val.split(",")
        .map((origin) => origin.trim())
        .filter(boolean)
    ),
    MODERATOR_NAME: z.string().min(1, "MODERATOR_NAME: O nome do usuário moderador não foi carregada do arquivo .env."),
    MODERATOR_PASSWORD: z.string().min(1, "MODERATOR_PASSWORD: A senha do usuário moderador não foi carregada do arquivo .env."),
    TIME_CLOCK_NAME: z.string().min(1, "TIME_CLOCK_NAME: O nome do usuário terminal de ponto não foi carregada do arquivo .env."),
    TIME_CLOCK_PASSWORD: z.string().min(1, "TIME_CLOCK_PASSWORD: A senha do usuário terminal de ponto não foi carregada do arquivo .env."),
});

export const env = envSchema.parse(process.env);