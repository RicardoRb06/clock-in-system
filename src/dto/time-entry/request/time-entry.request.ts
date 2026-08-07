import { z } from 'zod';

export const TimeEntryRequestSchema = z.object({
    userId: z.string()
        .min(1, "Campo 'userId' não pode ficar vazio"),
});

export type TimeEntryRequestDto = z.infer<typeof TimeEntryRequestSchema>;