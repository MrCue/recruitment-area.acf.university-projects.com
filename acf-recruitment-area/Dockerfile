FROM golang:1.27 AS go-builder

WORKDIR /app

COPY generator/go.mod generator/go.sum ./
RUN go mod download

COPY generator/*.go ./
COPY generator/_data/database.sqlite ./_data/

RUN CGO_ENABLED=0 GOOS=linux go build -o /docker-json-generator

RUN mkdir -p /app/_generated
RUN /docker-json-generator




FROM oven/bun:1.4.2-alpine

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install

COPY . .

COPY --from=go-builder /app/_generated/*.json ./data/

CMD ["bun", "dev"]