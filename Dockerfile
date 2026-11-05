# polemil.dev (Next.js) — build standalone, servi par `node server.js`.
# syntax=docker/dockerfile:1

# Version exacte, patchée (security release Node.js du 21/10/2026).
ARG NODE_VERSION=24.22.1-alpine

FROM node:${NODE_VERSION} AS build
WORKDIR /app
RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Inlinées dans le bundle client : doivent être là au BUILD
# (« Build Variable » dans Coolify).
ARG NEXT_PUBLIC_BO_URL
ARG NEXT_PUBLIC_GRAPHQL_URL
ENV NEXT_PUBLIC_BO_URL=$NEXT_PUBLIC_BO_URL \
    NEXT_PUBLIC_GRAPHQL_URL=$NEXT_PUBLIC_GRAPHQL_URL \
    NEXT_TELEMETRY_DISABLED=1

COPY . .
RUN pnpm build

FROM node:${NODE_VERSION} AS runtime
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    HOSTNAME=0.0.0.0 \
    PORT=3000

COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static
COPY --from=build --chown=node:node /app/public ./public

USER node
EXPOSE 3000
CMD ["node", "server.js"]
