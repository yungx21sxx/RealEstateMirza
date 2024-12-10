import type {UserResponse} from "#shared/types/auth.types";

export default () => {
    return useState<UserResponse | null>("user", () => null);
};
