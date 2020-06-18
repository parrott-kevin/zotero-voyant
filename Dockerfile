FROM node:erbium-alpine

RUN apk --no-cache add git

RUN mkdir -p /www

WORKDIR /www
COPY . .
RUN chown -R 1000:1000 .

RUN yarn install --silent

EXPOSE 8080

USER 1000

CMD ["yarn", "start"]