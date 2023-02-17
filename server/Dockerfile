FROM node:16.10 AS build
RUN apt-get -y update
RUN groupadd -r user && useradd -r -g user user
USER user
WORKDIR /usr/src/app/
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start:prod"]