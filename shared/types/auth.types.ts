export interface VerifyAuthDTO {
    email: string;
    code: string
}

export interface LoginDTO {
    email: string;
}

export type UserRoles = 'ADMIN' | 'USER'

export interface UserResponse {
    role: UserRoles,
    email: string,
    id: number
}

export interface LoginResponse {
    email: string
}