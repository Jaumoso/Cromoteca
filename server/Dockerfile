# syntax=docker/dockerfile:1
FROM node:16.10 AS build
WORKDIR /usr/src/app/
COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm npm install
COPY . .
RUN --mount=type=cache,target=/root/.npm npm run build
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
