FROM node:18-alpine

WORKDIR /app

# copy package files
COPY package*.json ./

# install dependencies
RUN npm ci --only=production

# copy source code
COPY . .

# install dev dependencies for build
RUN npm install -D typescript @types/node

# build typescript
RUN npm run build

# expose port
EXPOSE 3001

# start app
CMD ["node", "dist/server.js"]