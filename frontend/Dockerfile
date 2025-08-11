# ---- Build stage ----
FROM node:18-alpine AS builder

WORKDIR /app
COPY package.json package-lock.json* yarn.lock* ./
RUN yarn install --frozen-lockfile || npm install

COPY . .

RUN yarn build || npm run build
RUN yarn export || npm run export

# ---- Run stage ----
FROM nginx:alpine

COPY --from=builder /app/out /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]