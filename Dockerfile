FROM node:19-alpine

# Copy dependency definitions
COPY package.json ./

# disabling ssl for npm for Dev or if you are behind proxy
RUN npm set strict-ssl false


## installing and Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm i

RUN mkdir /app

RUN mv ./node_modules ./app

# Change directory so that our commands run inside this new directory
WORKDIR /app

# Get all the code needed to run the app
COPY . /app/

# Expose the port the app runs in
EXPOSE 8001

# Serve the app
CMD ["npm", "start"]