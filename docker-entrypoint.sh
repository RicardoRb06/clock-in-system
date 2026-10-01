#!/bin/sh
set -e

echo "[entrypoint] Aplicando migrations..."
pnpm exec prisma migrate deploy

# O seed usa upsert (idempotente): cria o moderador e o terminal de ponto
# a partir das variáveis MODERATOR_* e TIME_CLOCK_* se ainda não existirem.
if [ "${RUN_SEED:-true}" = "true" ]; then
    echo "[entrypoint] Rodando seed..."
    pnpm exec prisma db seed
fi

echo "[entrypoint] Iniciando a API..."
# exec faz o node virar o PID 1 e receber SIGTERM do Docker corretamente
exec "$@"
