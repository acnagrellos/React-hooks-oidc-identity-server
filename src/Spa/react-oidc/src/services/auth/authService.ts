import { UserManager, Log, User, UserManagerSettings } from 'oidc-client';

type EventsConfigCallback = (
    onUserLoaded: (user: User) => void,
    onUserUnloaded: () => void,
    onError: (error: Error) => void,
    onAccessTokenExpiring: () => void,
    onAccessTokenExpired: () => void
) => void;

export type AuthService = Readonly<{
    authenticateUser: (
        showRegistryArea: boolean,
        loginHeaderId: string,
        redirectToRegisterPage?: boolean
    ) => Promise<void>;
    authenticateUserCallback: () => Promise<void>;
    signOutUser: () => Promise<void>;
    signInSilent: () => Promise<void>;
    completeSignInSilent?: () => Promise<void>;
    registerEvents: EventsConfigCallback;
    unregisterEvents: EventsConfigCallback;
    tryLoadUser: () => Promise<boolean>;
    revokeAccessToken: () => Promise<void>;
}>;

const userLoaded : ((user: User) => void)[] = [];

const AuthServiceFactory = (userManagerSettings: UserManagerSettings, debug: boolean) => {
    const userManager = new UserManager(userManagerSettings);
    userManager.events.addUserLoaded(user => 
    {
        userLoaded.map(e => e(user));
    });

    Log.logger = console;
    Log.level = debug ? Log.INFO : Log.ERROR;

    const signInRedirect = async (): Promise<void> => {
        await userManager.revokeAccessToken();
        await userManager.clearStaleState();
        await userManager.signinRedirect();
    };

    const signInSilent = async (): Promise<void> => {
        await userManager.signinSilent();
    };

    const signInSilentCallback = async (): Promise<void> => {
        await userManager.signinSilentCallback();
    };

    const getUser = async () => {
        const user = await userManager.getUser();
        return user;
    };

    const authenticateUser = async (): Promise<void> => {
        const user = await userManager.getUser();
        if (!user) {
            await signInRedirect();
        } else {
            try {
                await signInSilent();
            } catch (error) {
                await signInRedirect();
            }
        }
    };

    const authenticateUserCallback = async (): Promise<User> => {
        const user = await userManager.signinRedirectCallback(window.location.href);
        return user;
    };

    const signOutUser = async (): Promise<void> => {
        await userManager.clearStaleState();
        await userManager.signoutRedirect();
    };

    const registerEvents = (
        onUserLoaded: (user: User) => void
    ): void => {
        userLoaded.push(onUserLoaded);
    };

    const unregisterEvents = (
        onUserLoaded: (user: User) => void
    ): void => {
        userManager.events.removeUserLoaded(onUserLoaded);
    };

    const tryLoadUser = async (): Promise<boolean> => {
        const user = await userManager.getUser();
        if (user && !user.expired) {
            userManager.events.load(user);
            return true;
        }
        return false;
    };

    const revokeAccessToken = async (): Promise<void> => {
        await userManager.revokeAccessToken();
    };

    return Object.freeze({
        authenticateUser,
        authenticateUserCallback,
        signOutUser,
        getUser,
        signInSilent,
        signInSilentCallback,
        registerEvents,
        unregisterEvents,
        tryLoadUser,
        revokeAccessToken
    });
};

export { AuthServiceFactory };
