# apps/web/Dockerfile
FROM node:20-alpine

# Install pnpm globally
RUN npm install -g pnpm

WORKDIR /app

# Copy only the local package.json
COPY package.json ./

# Install dependencies (forcing devDependencies for vite)
RUN pnpm install --prod=false --frozen-lockfile=false

# Copy source code
COPY . .

# Build Argument for Backend URL
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

# Build the application
RUN pnpm run build

# Expose port 5173
EXPOSE 5173

# --- THE FIX ---
# We use 'pnpm exec vite' to run the binary directly with the correct flags.
# This forces it to listen on 0.0.0.0 (Host) and port 5173.
CMD ["pnpm", "exec", "vite", "preview", "--host", "0.0.0.0", "--port", "5173"]