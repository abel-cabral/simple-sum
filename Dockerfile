# =========================
# Estágio 1: Build da PWA
# =========================
FROM node:16 AS build

WORKDIR /app

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala dependências
RUN npm install -g @quasar/cli@2.4.1
RUN npm install

# Copia todo o código
COPY . .

# Build da PWA
RUN npm run build

# =========================
# Estágio 2: Servir a PWA
# =========================
FROM node:16-alpine

WORKDIR /app

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala somente dependências de produção
RUN npm install --only=production

# Copia o build da PWA do estágio anterior
COPY --from=build /app/dist/pwa ./dist/pwa

# Copia o server.js
COPY server.js .

# Expõe a porta 80
ENV PORT=80
EXPOSE 80

# Inicia o servidor
CMD ["node", "server.js"]
