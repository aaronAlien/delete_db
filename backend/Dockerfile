FROM node:18-alpine

WORKDIR /app

# copy package files first
COPY package*.json ./

# install dependencies
RUN npm install

# copy everything else
COPY . .

# build typescript
RUN npm run build

# remove dev dependencies
RUN npm prune --production

# expose port
EXPOSE 3001

# start
CMD ["node", "dist/server.js"]