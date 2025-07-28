FROM node:18-alpine

RUN apk add --no-cache curl bash docker-cli

RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:$PATH"

WORKDIR /usr/src/app

COPY package*.json bun.lock ./
RUN bun install

COPY . .

RUN bun run build

EXPOSE 3000

CMD ["bun", "run", "start"]
