FROM nginx:1.16.1-alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY dist /etc/nginx/html

RUN mkdir -p /data/nginx/cache

VOLUME /data/nginx/cache