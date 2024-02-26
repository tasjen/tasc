FROM node:20 AS build
WORKDIR /app
COPY . .
ENV NODE_ENV=prod
RUN npm ci
RUN npm run tsc

FROM node:20-bookworm-slim
WORKDIR /app
COPY --from=build /app/build .
COPY --from=build /app/package* .
COPY --from=build /app/.env .
RUN npm ci --omit=dev
CMD ["node", "index.js"]