FROM node:20 AS build

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy source code
COPY . .

# Build Vite app
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy Vite build output
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3234

CMD ["nginx", "-g", "daemon off;"]
