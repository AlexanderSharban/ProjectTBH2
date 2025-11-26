# Dockerfile

# Укажите базовый образ
FROM node:18

# Установите рабочую директорию
WORKDIR /usr/src/app

# Скопируйте package.json и package-lock.json
COPY package*.json ./

# Установите зависимости
RUN npm ci --silent

# Скопируйте остальные файлы
COPY . .

# Укажите порт, который будет использоваться
EXPOSE 3000

# Запустите приложение
CMD [ "npm", "run", "start" ]
