FROM node:12-alpine

EXPOSE 3000
WORKDIR /home/node/app

COPY ./package*.json ./
RUN npm install

COPY ./ ./
RUN npm run build

ENTRYPOINT ["node"]
CMD ["dist/main.js"]
