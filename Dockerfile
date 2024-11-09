FROM node:alpine

WORKDIR /app

COPY . .
COPY package*.json ./
COPY tsconfig.json ./
COPY .env ./
COPY lastSync ./

EXPOSE 3000

RUN npm install
RUN npm run build

CMD ["npm", "run", "start"]
