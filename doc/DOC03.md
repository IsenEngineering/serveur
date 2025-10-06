| [accueil](/readme.md) | [documentation conteneurs](/doc/DOC02.md) |
| --- | --- |

# Documentation Proxy

## Introduction

Le proxy est l'interface entre les requêtes reçues par le serveur et les différents conteneurs.
Il s'assure que les requêtes s'addressent aux bons services.

> Ex: une requête pour `tide.isenengineering.fr` sera reçu par le proxy, il va chercher à quel conteneur cette requête corresponds et déduira qu'il faut l'addresser au conteneur `tide`.  

Bien heureusement, nous avons pas recoder un proxy pour ça, nous utilisons [Traefik](https://traefik.io) (Il existe aussi des equivalents comme Nginx, Apache, Caddy ou Pingora mais la configuration est différente et moins automatique).

> [!CAUTION]
> Avant de vous lancez veuillez maîtriser [documentation conteneurs](/doc/DOC02.md)

## Proxy

La configuration est assez simple avec Traefik, 
on configure les différentes routes avec des étiquettes que l'on dépose sur les conteneurs,
et traefik étant dans le même réseau, il lit toutes les étiquettes en temps réel.

> Traefik trouve le port sur lequel envoyer le traffic automatiquement.
> ([s'il y en a plusieurs il choisit le plus faible, sinon faut préciser](https://doc.traefik.io/traefik/reference/install-configuration/providers/docker/#port-detection))


### Configuration avec un conteneur

Dans votre docker-compose.yml ça ressemble à ça

```yml
services:
  votre-service:
    # ...
    labels:
      # On dit à traefik qu'il peut lire les autres étiquettes
      - "traefik.enable=true" 
      # D'où doit venir le traffic
      - "traefik.http.routers.votre-service.rule=Host(`ma-route.isenengineering.fr`)"
      # Où le traffic entre (port 443 avec TLS / en https)
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

### Configuration avec un fichier

Il est également possible de configurer des services, des redirections et d'autres entités avec des fichiers.
La configuration se situe dans repértoire de la configuration du conteneur Traefik : `/home/pod/traefik/var`

`discord.yml`
```yml
http:
  # Action sur la requête
  middlewares:
    redirect-discord:
      redirectRegex:
        # Prends toutes les requêtes
        regex: ".*"
        # Remplace par ...
        replacement: "https://discord.gg/FbExFPfsF9"
        # permanent influt sur le code de la réponse ex: 301
        permanent: true

  # Quelles requêtes sont prises en comptes
  routers:
    redirect-discord:
      # L'addresse à laquelle ont prends les requêtes
      rule: "Host(`discord.isenengineering.fr`)"
      # Par où les requêtes entrent
      entryPoints:
        - web # port 80
        - websecure # port 443
      middlewares:
        # action sur la requête
        - redirect-discord
      # on doit obligatoirement donner un service à un routeur,
      # dans ce cas là, il s'agit de `no operation`
      service: noop@internal
```

Une fois que vous avez écrit et sauvegarder votre configuration dans `/home/pod/traefik/var` en `.yml`, **le proxy se mettra à jour automatiquement**; il n'est pas nécessaire de redémarrer le conteneur.


## Accès au panel

Traefik expose un panel de gestion qui montre la configuration actuelle avec une interface web.
Pour accéder à cet dernier vous devez avoir un appareil sur le réseau [Wireguard de l'IE](/inf/INF03.md) et vous rendre à [proxy.wg.ie](http://proxy.wg.ie).

![Traefik Dashboard](/assets/doc/traefik.jpeg)



> *Livio A, 05/10/25*