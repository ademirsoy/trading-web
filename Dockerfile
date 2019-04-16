FROM nginx
RUN rm /etc/nginx/conf.d/default.conf; exit 0
COPY nginx.conf /etc/nginx
COPY ./build /etc/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]