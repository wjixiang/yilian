FROM  node:14

WORKDIR  /docker

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=8080

RUN npx tsc

EXPOSE 8080

CMD ["node","dist/index.js"]