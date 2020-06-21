import { User } from "oidc-client";

export type AuthUser = {
    email?: string;
};

const getAuthUser = (user?: User | null): AuthUser | undefined => 
    user
        ? {
            email: user.profile.email
        }
        : undefined;

export { getAuthUser };
