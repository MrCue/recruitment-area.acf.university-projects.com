FROM node:22-alpine AS base

WORKDIR /app
COPY ["./package.json",  "./pnpm-*.yaml", "./"]

RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

COPY "./" "./"

CMD ["pnpm", "dev"]