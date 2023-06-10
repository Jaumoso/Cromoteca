# syntax=docker/dockerfile:1
FROM node:16.10 AS build
WORKDIR /usr/src/app/
COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm npm install
COPY . .
RUN --mount=type=cache,target=/root/.npm npm run build:prod

FROM docker.io/nginx:latest
COPY --from=build /usr/src/app/dist/client /usr/share/nginx/html
EXPOSE 80 443
