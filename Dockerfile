# Utilise Node 20 en version légère
FROM node:20-alpine

# Répertoire de travail
WORKDIR /app

COPY package*.json ./

# Installe toutes les dépendances
RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]
