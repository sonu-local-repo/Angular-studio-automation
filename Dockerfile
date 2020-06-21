### STAGE 1: Build ###
FROM node:latest AS build

WORKDIR /usr/src/app
COPY package.json ./
# RUN npm install -g @angular/cli@8.3.22
RUN npm install
COPY . .
RUN npm run build
### STAGE 2: Run ###
FROM nginx:alpine
COPY --from=build /usr/src/app/dist/smart-studio /usr/share/nginx/html
#COPY ./default.conf /etc/nginx/conf.d/default.conf -- enable this for KUBERNETES
