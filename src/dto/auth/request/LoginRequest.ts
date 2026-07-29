import { z } from 'zod';

export const LoginRequestSchema = z.object({
    name: z.string()
        .min(1, "Campo 'nome' não pode ficar vazio"),
    password: z.string()
        .min(6, "Campo 'senha' não pode ficar vazio"),
});