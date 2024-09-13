# Usar uma imagem base com Node.js
FROM node:18

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copiar o package.json e package-lock.json para o contêiner
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install

# Copiar todo o código fonte para o diretório de trabalho
COPY . .

# Expor a porta em que o aplicativo vai rodar
EXPOSE 3000

# Comando para iniciar o aplicativo
CMD ["node", "index.js"]
