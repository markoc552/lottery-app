# Dockerfile for building Lottery App production image

FROM node:14 as builder

LABEL maintainer="Marko Perajica"
LABEL version="1.0"

RUN mkdir /opt/lottery

WORKDIR "/opt/lottery"

COPY ./package.json ./
COPY ./package-lock.json ./
COPY ./yarn.lock ./

RUN yarn upgrade
RUN yarn install

COPY ./ ./

RUN yarn build

FROM nginx:latest
EXPOSE 3000
COPY ./nginx/lottery.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /opt/lottery/build /usr/share/nginx/html