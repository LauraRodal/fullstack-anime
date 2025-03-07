# Usa la imagen oficial de Node.js
FROM node:18

# Crear y establecer el directorio de trabajo
WORKDIR /usr/src/app

# Copiar los archivos package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos del proyecto
COPY . .

# Exponer el puerto en el que el servidor estará corriendo
EXPOSE 5000

# Definir el comando para iniciar el servidor
CMD ["npm", "run", "dev"]
