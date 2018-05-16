# In your Dockerfile.
FROM node:9

# The base node image sets a very verbose log level.
ENV NPM_CONFIG_LOGLEVEL warn
RUN mkdir /app
WORKDIR /app
COPY . .
#RUN npm config set proxy http://139.59.5.213:5050/ && \
#  npm config set https-proxy http://139.59.5.213:5050/ &&\
#  npm config set strict-ssl false

# In your Dockerfile.
RUN npm install && npm install -g serve


# Below commented lines can be used for production case
# In your Dockerfile.
RUN npm run build --production


# Run serve when the image is run.
CMD serve -s build

# Let Docker know about the port that serve runs on.
# CMD npm start
EXPOSE 3000

