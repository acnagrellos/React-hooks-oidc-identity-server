using IdentityServer4;
using IdentityServer4.Models;
using System.Collections.Generic;

namespace AjedrezTomelloso.ServidorIdentidad.Host
{
    public static class Config
    {
        public static IEnumerable<IdentityResource> Ids =>
            new IdentityResource[]
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
                new IdentityResources.Email()
            };

        public static IEnumerable<ApiResource> Apis =>
            new ApiResource[]
            {
                new ApiResource("api1", "My API #1")
            };

        public static IEnumerable<Client> Clients =>
            new Client[]
            {
                new Client
                {
                    ClientId = "react",
                    ClientName = "react-spa",
                    ClientSecrets = {new Secret("acf2ec6fb01a4b698ba240c2b10a0243".Sha256())},
                    RequireClientSecret = false,
                    RequireConsent = false,
                    AccessTokenLifetime = 3600,
                    AlwaysSendClientClaims = true,
                    AlwaysIncludeUserClaimsInIdToken = true,
                    RedirectUris = new List<string> { "http://localhost:5885/", "http://localhost:5885/callback"  },
                    PostLogoutRedirectUris = new List<string> { "" },
                    AllowedCorsOrigins = new List<string> { "http://localhost:5885" },
                    AllowedGrantTypes = GrantTypes.Code,
                    AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        IdentityServerConstants.StandardScopes.Email
                    },
                    AllowOfflineAccess = true,
                }
            };
    }
}