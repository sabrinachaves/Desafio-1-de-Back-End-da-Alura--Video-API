FROM node:14.17.1-alpine

RUN apk add --update --no-cache tzdata

# Export Envs
ENV TZ America/Sao_Paulo

WORKDIR /app

COPY . .

# Test and build application
RUN npm ci
RUN npm run build

EXPOSE 3000

CMD ["node", "dist/index.js"]