import { z } from 'zod';

export const RegisterRequestSchema = z.object({
    name: z.string()
        .min(1, "O nome é obrigatório"),
    password: z.string()
        .min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export type RegisterRequestDto = z.infer<typeof RegisterRequestSchema>;