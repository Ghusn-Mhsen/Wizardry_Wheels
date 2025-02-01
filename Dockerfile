# Base Stage
FROM node:22 AS base
WORKDIR /app

# Development Stage
FROM base AS development
COPY package.json .
RUN npm install
COPY . .
EXPOSE 4000


# Production Stage
FROM base AS production
COPY package.json .
RUN npm install --only=production
COPY . .
EXPOSE 5000

