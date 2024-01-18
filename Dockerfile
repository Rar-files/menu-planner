ARG BASE=node:18-alpine

#Install dependencies:

FROM ${BASE} AS dependencies

WORKDIR /app
COPY package.json yarn.lock ./
COPY prisma ./prisma

RUN yarn install --production=true --frozen-lockfile --ignore-scripts \
    && npx prisma generate \
    && cp -R node_modules prod_node_modules \
    && yarn install --production=false --prefer-offline \
    && npx prisma generate \
    && rm -rf prisma \
    && yarn cache clean


#Builder:

FROM ${BASE} AS builder
WORKDIR /app

COPY . .
COPY --from=dependencies /app/node_modules ./node_modules

ARG ARG_POSTGRES_URL
ARG ARG_POSTGRES_URL_NON_POOLING
ENV POSTGRES_URL=$ARG_POSTGRES_URL
ENV POSTGRES_URL=$ARG_POSTGRES_URL_NON_POOLING

# debug
RUN echo "POSTGRES_URL=$POSTGRES_URL"
RUN echo "POSTGRES_URL_NON_POOLING=$POSTGRES_URL_NON_POOLING"

RUN yarn build && rm -rf node_modules


#Production:
FROM ${BASE} AS production
WORKDIR /app

COPY --from=builder /app/next.config.js ./
# COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=dependencies /app/prod_node_modules ./node_modules
# COPY --from=builder --chown=node:node /app/dist ./dist
COPY --from=builder --chown=node:node /app/.next ./.next
COPY --from=builder --chown=node:node /app/prisma ./prisma

USER node

EXPOSE 3000

# run migrate and seed here
CMD ["yarn", "start"]