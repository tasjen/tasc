FROM node:20-bookworm AS builder
WORKDIR /app
COPY . .
RUN corepack enable && \
    corepack prepare pnpm@latest --activate
RUN pnpm install --frozen-lockfile
RUN pnpm run build

FROM gcr.io/distroless/nodejs20-debian12
WORKDIR /app
ENV NODE_ENV=prod
COPY --from=builder /app/build .
COPY ./.env .
CMD ["--enable-source-maps", "index.js"]