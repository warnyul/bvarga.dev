FROM nginx:1.16.1-alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=dist /etc/nginx/html /etc/nginx/html

RUN mkdir -p /data/nginx/cache

VOLUME /data/nginx/cache