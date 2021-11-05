FROM node:latest
WORKDIR /app
COPY package.json /app
RUN npm install
RUN npm uninstall bcrypt
RUN npm install bcrypt
COPY . /app
CMD ["npm", "start"]