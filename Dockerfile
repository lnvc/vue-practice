FROM node:lts
COPY . /app
WORKDIR /app
CMD yarn && yarn dev
EXPOSE 3000
