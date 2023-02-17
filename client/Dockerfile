FROM node:16.10 AS build
WORKDIR /usr/src/app/
COPY package*.json ./
RUN npm install
COPY . /usr/src/app/
RUN npm run build

FROM docker.io/nginx:latest
COPY --from=build /usr/src/app/dist/client /usr/share/nginx/html
EXPOSE 80 443