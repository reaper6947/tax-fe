# Base image with Node.js on Alpine
FROM node:19-slim AS base

# Development image
FROM base AS development

# Adding libc6-compat for glibc compatibility


WORKDIR /frontend

ENV NODE_ENV development

COPY --chown=node:node ./ ./

RUN npm install 

EXPOSE 8080

CMD ["npm", "run", "dev"]

# Install dependencies only when needed
FROM base AS deps

# Adding libc6-compat for glibc compatibility


WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# Install dependencies based on the presence of lock files
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Rebuild the source code only when needed
FROM base AS builder

WORKDIR /app

ENV NODE_ENV production

# Adding libc6-compat for glibc compatibility


COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner

WORKDIR /app

# Adding libc6-compat for glibc compatibility


ENV NODE_ENV production

# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED 1

# Create a non-root user and group
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the build artifacts from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-root user
USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
