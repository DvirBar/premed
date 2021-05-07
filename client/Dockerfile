# Step 1 - create production build of react app
FROM node:14 AS builder

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm install

COPY . .


RUN npm run build

# Step 2 - set up Nginx web server
FROM nginx:1.19

# Copy react production build to nginx server
COPY --from=builder /usr/src/app/build /usr/share/nginx/html

# Remove default config file
RUN rm /etc/nginx/conf.d/default.conf

COPY ./nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

EXPOSE 443
# Start nginx server
CMD ["/bin/bash", "-c", "nginx -g \"daemon off;\""]