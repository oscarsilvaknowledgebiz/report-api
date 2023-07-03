FROM node:lts-alpine3.18
WORKDIR /app
COPY . .
#COPY .env .env since .env will be handled in gitlab-ci
RUN npm install
# Add docker-compose-wait tool -------------------
ENV WAIT_VERSION 2.7.2
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait /wait
RUN chmod +x /wait

CMD ["node","server.js"]
