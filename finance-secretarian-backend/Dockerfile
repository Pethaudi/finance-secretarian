FROM node:13
EXPOSE 5500

RUN git clone --single-branch --branch develop https://github.com/Pethaudi/finance-secretarian.git
RUN cd finance-secretarian/finance-secretarian-backend; npm i;
CMD cd finance-secretarian/finance-secretarian-backend; npm run build; npm run launch