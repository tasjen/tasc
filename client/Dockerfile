FROM node:lts AS build

WORKDIR /app
COPY ./client .
COPY ./server /server
RUN npm ci
# ENV REACT_APP_BACKEND_URL=http://localhost:8080/api
RUN npm run build

FROM nginx:1.20-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /app/dist .
ENTRYPOINT ["nginx", "-g", "daemon off;"]
