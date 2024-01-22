FROM node:latest

WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of your app's source code
COPY . .

EXPOSE 3000

ENV NAME FlavorFind

CMD ["npm", "start"]
