export const AUTH_COOKIE_NAME = 'auth_token'

export const AUTH_COOKIE_OPTIONS = {
    httpOnly: true,
    secure: true,
    sameSite: 'strict' as const,
    maxAge: 60 * 60 * 1000
}