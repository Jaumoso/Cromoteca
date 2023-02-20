# syntax=docker/dockerfile:1
FROM node:16.10 AS build
WORKDIR /usr/src/app/
COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm npm install
COPY . .
RUN --mount=type=cache,target=/root/.npm npm run build

FROM node:16.10-alpine
WORKDIR /usr/src/app/
COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm npm install --production
COPY --from=build /usr/src/app/dist/ .
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
