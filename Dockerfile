FROM nginx:1.16.1-alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY src /usr/share/nginx/html