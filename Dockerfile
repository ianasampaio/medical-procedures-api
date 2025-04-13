FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD sleep 5 && npx prisma migrate deploy && npm run seed && npm run start:dev


