FROM golang:alpine3.22 AS dev
WORKDIR /doc-ie

RUN apk add --no-cache --repository=https://dl-cdn.alpinelinux.org/alpine/edge/community hugo
RUN apk add --no-cache git

EXPOSE 1313
ENTRYPOINT [ "hugo" ]
CMD [ "server", "--buildDrafts", "--disableFastRender", "--bind", "0.0.0.0" ]

LABEL org.opencontainers.image.source=https://github.com/isenengineering/serveur
LABEL org.opencontainers.image.description="Un conteneur de développement qui sert la documentation du pôle serveur"