FROM node:16.10 AS build
ENV NODE_ENV production
WORKDIR /usr/src/app/
COPY package*.json ./
RUN npm install
COPY --chown=node:node . /usr/src/app/
RUN npm ci --only=production
USER node
RUN npm run build

FROM docker.io/nginx:latest
COPY --from=build /usr/src/app/dist/client /usr/share/nginx/html
EXPOSE 80 443