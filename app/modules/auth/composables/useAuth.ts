import useAuthUser from "~/modules/auth/composables/useAuthUser";
import type {UserResponse} from "#shared/types/auth.types";
import {AuthAPI} from "~/modules/auth/api/auth.api";

export const useAuth = () => {
    const authUser = useAuthUser();

    const setAuthUser = (user: UserResponse | null) => {
        authUser.value = user;
    };

    const setCookie = (cookie: any) => {
        cookie.value = cookie;
    };


    const logout = async () => {
        await AuthAPI.logout();
        setAuthUser(null);
    };

    const fetchProfile = async () => {
        try {
            const data = await AuthAPI.fetchProfile();
            if (data) {
                console.log(data)
                setAuthUser(data);
            }
        } catch (error) {
            setAuthUser(null);
        }
    };

    return {
        logout,
        fetchProfile,
        setAuthUser
    };
};
