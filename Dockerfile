FROM node:16
WORKDIR /pwa
ADD . /pwa
RUN npm install -g @quasar/cli
RUN npm install
RUN quasar build -m pwa

FROM httpd:latest
WORKDIR /usr/local/apache2/htdocs/
COPY --from=0 /pwa/dist/* ./usr/local/apache2/htdocs/
