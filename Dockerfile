FROM node:12-alpine

WORKDIR /app

# copy package.json and .lock file
# COPY package.json ./
# COPY package-lock.json ./
# copy src
COPY . .

# install deps
RUN npm install

# run
CMD ["npm", "start"]
