FROM denoland/deno:alpine
WORKDIR /app

COPY . .

RUN apk add --no-cache git openssh

RUN mkdir -p /root/.ssh && \
    chmod 700 /root/.ssh && \
    echo "Host github.com\n\
    HostName github.com\n\
    IdentityFile /app/keys/git\n\
    StrictHostKeyChecking no" > /root/.ssh/config && \
    git remote set-url origin git@github.com:IsenEngineering/serveur.git

RUN deno task build
RUN deno cache src/serve.ts

EXPOSE 80

CMD [ "deno", "task", "serve" ]