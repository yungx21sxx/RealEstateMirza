
import type {LoginDTO, LoginResponse, UserResponse, VerifyAuthDTO} from "#shared/types/auth.types";

export class AuthAPI {
    static async verifyAuth(dto: VerifyAuthDTO): Promise<UserResponse> {
        return $fetch('/api/auth/verify/login', {
            method: 'POST',
            body: dto
        })
    }

    static async login(dto: LoginDTO): Promise<LoginResponse> {
        return $fetch('/api/auth/login', {
            method: 'POST',
            body: dto
        })
    }


    static async logout() {
        return $fetch('/api/auth/logout')
    }

    static async fetchProfile(): Promise<UserResponse> {
        return $fetch("/api/auth/profile", {
            headers: useRequestHeaders(["cookie"]) as HeadersInit,
        })
    }
}


