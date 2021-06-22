FROM node:alpine
RUN mkdir /locadora
WORKDIR /locadora
COPY src/ /locadora/src
COPY public/ /locadora/public
ENV PATH ./node_modules/.bin:$PATH
#EXPOSE 3000
#install app dependencies
COPY package.json /locadora
#COPY package-lock.json /locadora
# start app
RUN npm install
CMD ["npm", "start"]