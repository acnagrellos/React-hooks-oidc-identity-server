import React, { FC, useContext, useCallback, useEffect, useState } from "react";
import { AuthServiceFactory } from "../services/auth/authService";
import { authConfiguration } from '../services/auth/auth-config';
import { User } from "oidc-client";
import { AuthUser, getAuthUser } from '../domain/authUser';

type UserContextProps = {
    user?: AuthUser;
};

type AuthActionsContextProps = {
    authCallback: () => Promise<User>;
    login: () => Promise<void>;
    logout: () => Promise<void>;
    getUser: () => Promise<User | null>;
    completeSilentRenewToken: () => Promise<void>;
}

const authService = AuthServiceFactory(authConfiguration, true);

const authServiceProvider = {
    authCallback: authService.authenticateUserCallback,
    login: authService.authenticateUser,
    logout: authService.signOutUser,
    getUser: authService.getUser,
    completeSilentRenewToken: authService.signInSilentCallback
};

const AuthContextActions = React.createContext<AuthActionsContextProps>(authServiceProvider);

const UserContext = React.createContext<Partial<UserContextProps>>({});

const AuthConsumer = AuthContextActions.Consumer;

const AuthProvider: FC = ({ children }) => {
    const [user, setUser] = useState<AuthUser | undefined>(undefined);

    useEffect(() => {
        const loadUser = async () => {
            const user = await authService.getUser();
            setUser(getAuthUser(user));
        }

        loadUser();
    }, [])

    const onUserLoaded = useCallback((user: User): void => {
        setUser(getAuthUser(user));
    }, []);

    useEffect(() => {
        authService.registerEvents(
            onUserLoaded
        );
    }, [
        onUserLoaded
    ]);

    return (
        <AuthContextActions.Provider value={authServiceProvider}>
            <UserContext.Provider value={{ user }}>
                { children }
            </UserContext.Provider>
        </AuthContextActions.Provider>
    );
}

const useAuthActionContext = () => useContext(AuthContextActions);

const useUserContext = () => useContext(UserContext);

export { AuthConsumer, AuthProvider, useAuthActionContext, useUserContext }
