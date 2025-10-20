FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install
# Copy the rest of the application code
COPY . .
CMD ["npm", "start"]