FROM nginx:1.27-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/site.conf
COPY presentation.html /usr/share/nginx/html/index.html
COPY medias /usr/share/nginx/html/medias
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
