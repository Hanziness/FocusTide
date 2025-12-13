FROM node:24-alpine AS builder

# Prepare specific Yarn version
RUN corepack enable && corepack prepare yarn@4.0.2 --activate

WORKDIR /app

COPY . .

RUN yarn install && yarn generate

# ---------------------------------------------------
FROM nginx:alpine AS server

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
