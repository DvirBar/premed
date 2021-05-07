FROM node:14

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

ENV NODE_ENV production

CMD ["npm", "start"]