# cloning and building frontend
FROM node:13 as builder
    RUN git clone --single-branch --branch develop https://github.com/Pethaudi/finance-secretarian.git
    RUN cd ./finance-secretarian/finance-secretarian-frontend; npm i
    RUN cd ./finance-secretarian/finance-secretarian-frontend; npm run build

# configuring nginx
FROM nginx
    RUN rm /etc/nginx/conf.d/default.conf
    COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
    RUN cat /etc/nginx/conf.d/default.conf
    RUN rm -rf /usr/share/nginx/html/*
    COPY --from=builder ./finance-secretarian/finance-secretarian-frontend/dist/finance-secretarian-frontend/* /usr/share/nginx/html/
    EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]