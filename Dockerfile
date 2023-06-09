#!/bin/bash
FROM node:18-alpine3.16

WORKDIR /app
COPY . .

RUN rm -rf node_modules
RUN npm install
RUN npm run build

CMD yarn next start
EXPOSE 3000
