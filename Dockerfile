FROM node:18-alpine

RUN apk add --no-cache curl bash docker-cli

RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:$PATH"

WORKDIR /usr/src/app

COPY package*.json bun.lock ./
RUN bun install

COPY . .

EXPOSE 3000

CMD ["bun", "run", "dev"]
