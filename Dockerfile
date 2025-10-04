# Limita Capacidade de Recursos no Build da Imagem
ARG MAX_CPU=0.5
ARG MAX_MEMORY=256M

# Estágio 1: Construção do projeto PWA
FROM node:16 AS build

WORKDIR /pwa

# Copia todos os arquivos do diretório atual para o diretório /pwa no container
ADD . /pwa

# Instala o Quasar CLI globalmente e as dependências do projeto
RUN npm install -g @quasar/cli@2.4.1 --force

# Compila o projeto para produção
RUN quasar build -m pwa

# Estágio 2: Configuração do servidor HTTP
FROM nginx:latest

# Copia os arquivos do estágio de build para o diretório de documentos do Nginx
COPY --from=build /pwa/dist/pwa/ /usr/share/nginx/html
