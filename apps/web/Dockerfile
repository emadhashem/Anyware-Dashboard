FROM node:20-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY package.json ./

RUN pnpm install --prod=false --frozen-lockfile=false

COPY . .

ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

RUN pnpm run build

EXPOSE 5173

CMD ["pnpm", "exec", "vite", "preview", "--host", "0.0.0.0", "--port", "5173"]