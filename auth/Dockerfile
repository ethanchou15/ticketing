FROM node:alpine

WORKDIR /app
COPY package.json .
# Install only production dependencies
RUN npm install --omit=dev
# Copy the rest of the application code
COPY . .
# Compile TypeScript before running
RUN npm run build

CMD ["node", "dist/index.js"]