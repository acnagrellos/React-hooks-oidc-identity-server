FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 AS base
WORKDIR /app
EXPOSE 80 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build
COPY ["Directory.Build.props", "Directory.Build.props"]
COPY ["build/dependencies.props", "build/dependencies.props"]
COPY ["AjedrezTomelloso.ServidorIdentidad.sln", "AjedrezTomelloso.ServidorIdentidad.sln"]
COPY ["src/IdentityServer/AjedrezTomelloso.ServidorIdentidad.Host/AjedrezTomelloso.ServidorIdentidad.Host.csproj", "src/IdentityServer/AjedrezTomelloso.ServidorIdentidad.Host/AjedrezTomelloso.ServidorIdentidad.Host.csproj"]
COPY ["src/IdentityServer/AjedrezTomelloso.ServidorIdentidad.Data/AjedrezTomelloso.ServidorIdentidad.Data.csproj", "src/IdentityServer/AjedrezTomelloso.ServidorIdentidad.Data/AjedrezTomelloso.ServidorIdentidad.Data.csproj"]
RUN dotnet restore 
COPY . .
RUN dotnet build "AjedrezTomelloso.ServidorIdentidad.sln" -c Release -o /app

FROM build AS publish
RUN dotnet publish "AjedrezTomelloso.ServidorIdentidad.sln" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "AjedrezTomelloso.ServidorIdentidad.Host.dll"]
