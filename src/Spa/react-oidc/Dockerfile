FROM node:13.12.0-alpine as build
COPY ["src/Spa/react-oidc/package.json", "app/package.json"]
COPY ["src/Spa/react-oidc/yarn.lock", "app/yarn.lock"]
WORKDIR /app
RUN yarn install --silent
COPY src/Spa/react-oidc .
RUN yarn build

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]