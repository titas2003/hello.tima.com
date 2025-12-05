FROM node:lts-alpine3.23
WORKDIR /app
COPY package.json .
RUN npm install
ENV PORT 3000
ENV MONGO_URL "mongodb+srv://admin:admin@aws-dmo.bsoplpt.mongodb.net/practice-001"
ENV JWT_SECRET SECRET123
ENV JWT_EXPIRES 1h
COPY . .
RUN npm test
EXPOSE 5000
CMD ["npm", "start"]