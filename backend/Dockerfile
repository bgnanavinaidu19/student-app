FROM node:18

WORKDIR /app

COPY backend/package*.json ./
RUN npm install

COPY backend/ .

COPY frontend/ /app/frontend/

CMD ["node", "server.js"]