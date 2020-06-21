import { UserManagerSettings, WebStorageStateStore } from 'oidc-client';
import configuration from '../../configuration/default';

const {
    oidc: { stsAuthority, clientId, clientRoot, clientScope }
} = configuration;

const authConfiguration: UserManagerSettings = {
    authority: stsAuthority,
    client_id: clientId,
    redirect_uri: `${clientRoot}/callback`,
    silent_redirect_uri: `${clientRoot}/silent`,
    post_logout_redirect_uri: `${clientRoot}`,
    response_type: 'code',
    scope: clientScope,
    automaticSilentRenew: true,
    userStore: new WebStorageStateStore({ store: window.localStorage })
};

export { authConfiguration };
