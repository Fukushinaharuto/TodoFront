FROM node:22.5-slim
WORKDIR /PracticeFront

COPY  . .
WORKDIR /PracticeFront/front

RUN npm install
RUN npm install axios
RUN apt-get update && \
    apt-get install -y git && \
    rm -rf /var/lib/apt/lists/*

RUN npm install axios






EXPOSE 3000
CMD ["npm","run","dev"]