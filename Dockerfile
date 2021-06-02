# pull the official base image
FROM node:13.12.0-alpine
# set working direction
WORKDIR /app
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
# install application dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm --optional true install
# add app
COPY . ./
RUN chown -R node:node /app/node_modules
EXPOSE 3000
# start app
CMD ["npm", "start"]
