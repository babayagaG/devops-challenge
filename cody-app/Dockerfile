# Use an official Node.js image as the base
FROM node:18

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package files first for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all remaining files
COPY . .

# Expose the app port (update if your server.js uses a different port)
EXPOSE 3000

# Command to run the app
CMD ["node", "server.js"]
