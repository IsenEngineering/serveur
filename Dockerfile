FROM denoland/deno:alpine
WORKDIR /app

COPY . .

RUN apk add git
RUN deno task build
RUN deno cache src/serve.ts

EXPOSE 80

CMD [ "deno", "task", "serve" ]