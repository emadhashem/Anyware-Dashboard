# apps/api/Dockerfile
FROM node:20-alpine

# Install pnpm globally
RUN npm install -g pnpm

WORKDIR /app

# Copy only the local package.json
COPY package.json ./

# 1. Force install devDependencies (needed for "nest build")
# 2. Use --frozen-lockfile=false because we don't have the root lockfile here
RUN pnpm install --prod=false --frozen-lockfile=false

# Copy source code (Filtered by .dockerignore)
COPY . .

# Build the NestJS application
RUN pnpm run build

# Expose the port
EXPOSE 3000

# Start the server
CMD ["node", "dist/main"]