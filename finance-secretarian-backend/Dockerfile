# to build docker-images: docker build -t finance-secretarian-backend .
FROM node
EXPOSE 5500
VOLUME /opt

RUN git clone --single-branch --branch develop https://github.com/Pethaudi/finance-secretarian.git
RUN cd finance-secretarian/finance-secretarian-backend; npm i;
CMD cd finance-secretarian/finance-secretarian-backend; npm run build; npm run launch