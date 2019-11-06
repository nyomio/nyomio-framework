FROM node:12.13-alpine

RUN apk update \
  && npm install -g npm@latest \
  && npm install -g @angular/cli

WORKDIR /app
COPY angular.json .
COPY node_modules node_modules
COPY package.json .
COPY package-lock.json .
COPY proxy.conf.json .
COPY tsconfig.app.json .
COPY tsconfig.json .
COPY tsconfig.spec.json .
COPY tslint.json .
COPY src src

CMD ["npm", "start"]
