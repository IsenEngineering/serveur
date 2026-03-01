+++
date = '2026-03-01T13:39:01+09:00'
title = 'Proxy'
tags = ["docker", "traefik", "wireguard"]
+++

## Introduction

Le proxy est l'interface entre les requêtes reçues par le serveur et les différents conteneurs (dans notre cas d'usage).
Il s'assure que les requêtes s'addressent aux bons services.

> Ex: une requête pour `tide.isenengineering.fr` sera reçu par le proxy, il va chercher à quel conteneur cette requête corresponds et déduira qu'il faut addresser la requête au conteneur `tide`.  

Bien heureusement, nous avons pas à programmer un proxy pour ça, nous utilisons [Traefik](https://traefik.io) (Il existe aussi des equivalents comme Nginx, Apache, Caddy ou Pingora mais la configuration est différente et moins automatique).

Par le passé, on a utilisé Nginx [ce document explique pourquoi on a changé](/inf/migration-traefik)

## Traefik

La configuration est assez simple, 
on configure les différentes routes avec des étiquettes que l'on dépose sur les conteneurs,
et traefik étant dans le même réseau distribue les requêtes aux conteneurs ayant les étiquettes référentes.

Il n'y a même pas besoin de préciser le port, Traefik trouve le port sur lequel envoyer le traffic automatiquement.
([s'il y en a plusieurs il choisit le plus faible, sinon faut préciser](https://doc.traefik.io/traefik/reference/install-configuration/providers/docker/#port-detection))


### Configuration avec un conteneur

Dans votre docker-compose.yml ça ressemble à ça

```yml {filename=docker-compose.yml}
services:
  votre-service:
    # ...
    labels:
      # On dit à traefik qu'il peut lire les autres étiquettes
      - "traefik.enable=true" 
      # On indique la provenance du traffic
      - "traefik.http.routers.votre-service.rule=Host(`ma-route.isenengineering.fr`)"
      # On précise quel traffic on récupère (ici le port 443 avec TLS / en https)
      # on aurait pu écrire web,websecure pour prendre https et http)
      - "traefik.http.routers.odoc-deno.entrypoints=websecure"
    networks:
      # Le réseau dans lequel Traefik se trouve
      - www

networks:
  www:
    # On connecte le réseau sur lequel Traefik écoute les changements et accède aux conteneurs
    # sans ça, Traefik ne peut communiquer avec le conteneur
    external: true
    name: www
```

[Documentation](https://doc.traefik.io/traefik/reference/routing-configuration/other-providers/docker/)
*sur laquelle il y a toutes les étiquettes*

### Redirections

Pour créer des redirections, j'ai fais la plateforme "link-ie" à cet effet il faut avoir la permission `permissions:linkie` et des identifiants sur la plateforme Tide de l'isenengineering.

[Vous pouvez y accéder ici](https://link-ie.isenengineering.fr)

Le code source est disponible [ici](https://github.com/IsenEngineering/LinkIE/), ce service récupère tous le traffic qui ne passe pas déjà par un autre service, s'il y a une correspondance avec sa base de données de redirections il répond avec la redirection en question. La base de données est simplement un fichier `toml`.

L'interface web permet de faire l'intéraction avec la base de données

## Accès au panel

Traefik expose un panel de gestion qui montre la configuration actuelle avec une interface web.
Pour accéder à cet dernier vous devez avoir un appareil sur le réseau [Wireguard de l'IE](/inf/INF03.md) et vous rendre à [proxy.wg.ie](http://proxy.wg.ie).

![Traefik Dashboard](/images/traefik.jpeg)