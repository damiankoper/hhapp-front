#dev
FROM node:lts AS develop-stage
WORKDIR /app
COPY ./package*.json ./
RUN npm install --verbose

#build
FROM develop-stage as build-stage
COPY . .
ENV NODE_ENV=production
WORKDIR /app
RUN npm run build

#prod
FROM nginx as production-stage
COPY --from=build-stage /app/dist /app
COPY .docker/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]