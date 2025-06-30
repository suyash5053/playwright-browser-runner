FROM node:18-alpine

RUN apk add --no-cache docker-cli

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install && \
    npx playwright install && \
    npm cache clean --force && \
    rm -rf /tmp/*

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
