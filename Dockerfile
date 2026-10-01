FROM node:24-slim

ENV NODE_ENV=production
WORKDIR /app

# Prisma precisa de OpenSSL; ca-certificates para conexões TLS
RUN apt-get update -y \
    && apt-get install -y --no-install-recommends openssl ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# O projeto exige pnpm ^11.7.0 (devEngines); o lockfile foi gerado com 11.x
RUN npm install -g pnpm@11

# 1) Dependências (camada cacheada enquanto package.json/lockfile não mudarem)
#    Instalamos também as devDependencies porque precisamos do CLI do Prisma
#    (migrate/generate) e do tsx (roda o TypeScript direto, sem etapa de build).
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
    NODE_ENV=development pnpm install --frozen-lockfile

# 2) Código-fonte + geração do Prisma Client
COPY prisma ./prisma
COPY prisma.config.ts tsconfig.json ./
COPY src ./src
RUN pnpm exec prisma generate

COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh \
    && chown -R node:node /app

USER node
EXPOSE 8080

HEALTHCHECK --interval=15s --timeout=5s --start-period=40s --retries=5 \
    CMD node -e "require('net').connect({port: process.env.PORT || 8080, host: '127.0.0.1'}).on('connect', () => process.exit(0)).on('error', () => process.exit(1))"

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["node", "--import", "tsx", "src/index.ts"]
