FROM node:20-alpine


RUN npm install -g pnpm

WORKDIR /app

COPY package.json ./

RUN pnpm install --prod=false --frozen-lockfile=false

COPY . .

RUN pnpm run build

EXPOSE 3000

CMD ["node", "dist/main"]