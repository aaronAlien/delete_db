FROM node:18-alpine

WORKDIR /app

# copy package files
COPY package*.json ./

# install ALL dependencies
RUN npm install

# copy source code
COPY . .

# build typescript
RUN npm run build

# remove devDependencies after build
RUN npm prune --production

# expose port
EXPOSE 3001

# start app
CMD ["node", "dist/server.js"]