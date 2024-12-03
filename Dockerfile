FROM node:23-alpine

RUN mkdir -p /app
WORKDIR /app

COPY src/ /app/src
COPY package.json /app
COPY LICENSE /app
COPY README.md /app

RUN npm install

ENTRYPOINT ["node", "src/index.js"]
CMD []