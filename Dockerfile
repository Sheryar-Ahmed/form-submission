FROM node:latest

# Copy package.json and package-lock.json files to the container
COPY package*.json ./

# Install system dependencies for Playwright and other required libraries
RUN apt-get update && \
    apt-get install -y \
    libgtk-3-0 \
    libgdk-pixbuf2.0-0 \
    libasound2 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    libxtst6 \
    libatk1.0-0 \
    libdbus-glib-1-2 \
    libdbus-1-3 \
    libx11-xcb1 \
    libxcursor1 \
    libxi6

# Install dependencies
RUN npm ci

# Copy the rest of the application code to the container
COPY . .

# Expose the port your Node.js website listens on
EXPOSE 5001

# Start the Node.js website when the container starts
CMD ["npm", "start"]
