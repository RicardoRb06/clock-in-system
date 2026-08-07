import { z } from 'zod';

export const timeEntryRequestSchema = z.object({
    userId: z.string()
        .min(1, "Campo 'userId' não pode ficar vazio"),
});

export type TimeEntryRequestDto = z.infer<typeof timeEntryRequestSchema>;