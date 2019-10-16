FROM node:10.15.0-alpine

RUN apk update && \
    apk add bash && \
    mkdir -p /app
COPY . ./app
WORKDIR /app
RUN npm run setup
CMD tail -f /dev/null
