FROM surnet/alpine-node-wkhtmltopdf:14.17.5-0.12.6-small

RUN apk update
RUN apk upgrade
RUN apk add bash

COPY . .
RUN npm ci
RUN wkhtmltopdf -V

EXPOSE 9002
