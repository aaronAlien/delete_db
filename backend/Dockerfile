FROM node:18-alpine

WORKDIR /app

# debug: list files???
RUN ls -la

# copy 
COPY . .

# debug: list again????
RUN ls -la

# install dependencies
RUN npm install

# build
RUN npm run build

EXPOSE 3001

CMD ["node", "dist/server.js"]