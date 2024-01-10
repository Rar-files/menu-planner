FROM node:18-alpine

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app
COPY yarn.lock /app

RUN yarn install

COPY . /app

RUN mkdir -p /app/.next/cache/images
VOLUME /app/.next/cache/images

RUN yarn build

EXPOSE 3000

CMD yarn start