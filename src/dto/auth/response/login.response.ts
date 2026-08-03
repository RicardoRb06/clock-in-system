export interface LoginResponseDto {
    success: boolean,
    token: string | null,
    error: string | null
}