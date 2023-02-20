FROM node:16.14.2-alpine
RUN apk add --no-cache git
RUN yarn set version berry
# RUN yarn global add firebase-tools npm-check-updates


# Install app dependencies
# RUN mkdir -p /app/node_modules
WORKDIR /app
COPY ./app /app

RUN yarn install
