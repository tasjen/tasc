FROM node:20-alpine AS builder
WORKDIR /app
COPY ./client .
COPY ./server /server
RUN npm ci
# ENV REACT_APP_BACKEND_URL=http://localhost:8080/api
RUN npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist .
ENTRYPOINT ["nginx", "-g", "daemon off;"]