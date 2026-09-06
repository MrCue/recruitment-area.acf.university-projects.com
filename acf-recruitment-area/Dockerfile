FROM ghcr.io/pnpm/pnpm:12

WORKDIR /app
COPY package.json pnpm-*.yaml ./
RUN pnpm install --frozen-lockfile

COPY "./" "./"

CMD ["pnpm", "dev"]