# Stage 1: Build Stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json ./
COPY pnpm-lock.yaml ./ 

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Production Stage
FROM node:18-alpine AS production

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

RUN npm install --production

EXPOSE 3000

CMD ["node", "dist/server.js"]
