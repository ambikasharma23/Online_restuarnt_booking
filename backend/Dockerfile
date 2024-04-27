# Use a base image with the appropriate runtime (e.g., Node.js, Python, etc.)
FROM node:latest

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of the backend source code to the working directory
COPY . .

# Expose the port your backend application runs on
EXPOSE 3000

# Command to run your backend application
CMD ["npm", "start"]
