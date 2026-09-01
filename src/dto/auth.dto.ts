import { z } from 'zod';

export const RegisterRequestSchema = z.object({
    name: z.string()
        .min(1, "O nome é obrigatório"),
    password: z.string()
        .min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export const LoginRequestSchema = z.object({
    name: z.string()
        .min(1, "Campo 'nome' não pode ficar vazio"),
    password: z.string()
        .min(8, "A senha deve ter no mínimo 8 caracteres")
        .max(64, "A senha deve ter no máximo 64 caracteres")
});

export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;
export type LoginRequest = z.infer<typeof LoginRequestSchema>;