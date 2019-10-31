FROM node:12.13-alpine

RUN apk update \
  && npm install -g npm@latest \
  && npm install -g @angular/cli

WORKDIR /app
COPY . .

CMD ["npm", "start"]
