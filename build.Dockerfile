FROM golang:alpine3.22 AS build
WORKDIR /doc-ie

RUN apk add --no-cache --repository=https://dl-cdn.alpinelinux.org/alpine/edge/community hugo
RUN apk add --no-cache git

COPY . .

RUN hugo build

FROM p3terx/darkhttpd
WORKDIR /www

COPY --from=build /doc-ie/public/ /www/

EXPOSE 80
CMD [ "/www" ]

LABEL org.opencontainers.image.source=https://github.com/isenengineering/serveur
LABEL org.opencontainers.image.description="Un serveur web qui sert la documentation du pôle serveur"