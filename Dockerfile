FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Install Meteor
RUN curl https://install.meteor.com/ | sh

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN meteor npm install --production

# Copy the entire application to the working directory
COPY . .

# Set environment variables for MongoDB connection
ENV ROOT_URL=http://localhost

# Build the Meteor application
RUN meteor build --server-only --allow-superuser --directory /usr/src/app/build

# Change directory to the bundle location
WORKDIR /usr/src/app/build/bundle

# Install production dependencies for the Meteor bundle
RUN cd programs/server && npm install --production

# Expose the port on which the Meteor application runs (default is 3000)
EXPOSE 3000

# Start the Meteor application
CMD ["node", "main.js"]
