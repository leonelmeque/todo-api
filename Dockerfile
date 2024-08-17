FROM node:20

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install
RUN npm run build

COPY . .

EXPOSE ${APP_PORT}

CMD ["echo", "Docker file commands finished"]
