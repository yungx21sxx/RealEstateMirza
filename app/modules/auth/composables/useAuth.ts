import type { UserResponse } from '#shared/types/auth.types'
import { AuthAPI } from '~/modules/auth/api/auth.api'
import useAuthUser from '~/modules/auth/composables/useAuthUser'

export function useAuth() {
  const authUser = useAuthUser()

  const setAuthUser = (user: UserResponse | null) => {
    authUser.value = user
  }

  const setCookie = (cookie: any) => {
    cookie.value = cookie
  }

  const logout = async () => {
    await AuthAPI.logout()
    setAuthUser(null)
  }

  const fetchProfile = async () => {
    try {
      const data = await AuthAPI.fetchProfile()
      if (data) {
        setAuthUser(data)
      }
    } catch (error) {
      setAuthUser(null)
    }
  }

  return {
    logout,
    fetchProfile,
    setAuthUser
  }
}
