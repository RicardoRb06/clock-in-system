import { z } from 'zod';

export interface TimeEntryResponseDto {
    success: boolean,
    message: string,
    error: string | null
}