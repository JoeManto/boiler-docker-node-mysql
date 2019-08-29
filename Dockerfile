FROM node:9

WORKDIR /app

COPY package*.json ./

RUN npm install && \
    npm cache clean --force

RUN set -ex; \
    apt-get update; \
    apt-get install -y --no-install-recommends \
    mysql-client

COPY . .

# Copy builded source from the upper builder stage
# COPY --from=builder /home/node/app/build ./build

ENV NODE_ENV development
ENV HTTP_PORT 7304
ENV UPDATE_INTERVAL 1

# Expose ports
EXPOSE 7304
