# to build docker-images: docker build -t finance-secretarian-frontend .
FROM node:13
EXPOSE 4200

RUN git clone --single-branch --branch develop https://github.com/Pethaudi/finance-secretarian.git
RUN cd finance-secretarian/finance-secretarian-frontend; npm i
RUN cd finance-secretarian/finance-secretarian-frontend; npm run build
RUN mkdir /var/www
RUN cp -avr finance-secretarian/finance-secretarian-frontend/dist/finance-secretarian-frontend/* /var/www
RUN ls /var/www

FROM nginx

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
#RUN echo "# /etc/nginx/conf.d/finance-secretarian-frontend.conf" > /etc/nginx/conf.d/finance-secretarian-frontend.conf
#RUN echo "server {listen 0.0.0.0:4200;root /srv/mysite;location / {try_files $uri $uri/ /index.html;}}" > /etc/nginx/conf.d/finance-secretarian-frontend.conf