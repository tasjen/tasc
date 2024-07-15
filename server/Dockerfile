FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

FROM gcr.io/distroless/nodejs20-debian12
WORKDIR /app
ENV NODE_ENV=prod
COPY --from=builder /app/build .
COPY ./.env .
CMD ["--enable-source-maps", "server.js"]