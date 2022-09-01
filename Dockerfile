FROM ubuntu:trusty AS ubuntu

RUN sudo apt-get -y update && \
    sudo apt-get -y upgrade && \
    sudo apt-get install -y sqlite3 libsqlite3-dev

RUN sqlite3 ./support.db 'pragma journal__mode=wal;'

FROM node:latest

RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y wget 

COPY . /bot
RUN cd bot/ && \
    npm i

COPY --from=ubuntu ["./support.db", "/bot/config/support.db"]

CMD ["npm", "run", "prod", "--prefix", "/bot"]
