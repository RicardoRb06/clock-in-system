import { z } from 'zod';

export const LoginRequestSchema = z.object({
    name: z.string()
        .min(1, "Campo 'nome' não pode ficar vazio"),
    password: z.string()
        .min(8, "A senha deve ter no mínimo 8 caracteres")
        .max(64, "A senha deve ter no máximo 64 caracteres")
});

export type LoginRequestDto = z.infer<typeof LoginRequestSchema>;