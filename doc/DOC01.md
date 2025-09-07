# Créer un conteneur et un accès.

En l'état, le serveur fonctionne avec des conteneurs. 
On isole toutes les applications en les conteneurisant.
Ca évite des problèmes de versions et c'est plus facile à gérer (ça se dés/intalle en une commande).

Depuis Septembre 2025, On utilise podman pour des raisons de sécurités et d'économies.
Pour gérer, créer ou supprimer des conteneurs, on doit passer utiliser l'utilisateur pod
`su prenom.nom.admin` -> En administrateur
`sudo su` -> En root
`su pod` -> En utilisateur pod

C'est chiant oui mais si tout le monde pouvait faire n'importe quoi,
niveau sécurité on serait embêté.

Maintenant vous pouvez utiliser la commande `pod` (`alias pod=podman`)

> Podman est très proche de docker, si vous connaissez docker vous connaissez podman.

## Commandes basiques

 - `pod images` -> Liste les images stockées
 - `pod rmi` -> Supprime une image par tag (ex: alpine:latest ou denoland/deno:alpine),
    C'est mieux de ne pas télécharger des images avec une commande. 
    L'idéale c'est qu'elle se télécharge toute seule au besoin.
 - `pod ps` -> Montre les conteneurs qui tourne (ps pour process status)
 - `pod ps -a` -> Montre tous les conteneurs (même ceux éteints)
 - `pod stop [conteneur]`
 - `pod rm [conteneur]`
 - `pod run [...paramètres] [image] [commande]` -> Favoriser `docker-compose.yml` (pour la coloc)

 - `pod compose up -d` -> Monter un assemblage de conteneurs (-d pour le mode détaché)
 - `pod compose down` -> Démonte un assemblage de conteneurs

## Docker-compose

```yml
# Définitions des services/conteneurs
services:
  api: # nom du service dans l'assemblage
    env_file: # fichier qui contient des variables d'environnement
      - .env
    image: alpine:latest # image du conteneur
    container_name: l-api # nom du conteneur globalement
    volumes: # Volumes -> connexion entre le conteneur et la machine
      - ./data:/data # ./data sera connecter à /data dans le conteneur
    user: root
    command: # commandes éxécutées au démarrage
      - /bin/sh
    restart: always # politique de redémarrage
    networks: # réseaux
      - www
    ports: # Connexion entre les ports de la machine et le conteneur
      - 80:8000 # le port 80 de la machine est connecté au port 8000 du conteneur
    labels: # étiquettes lisibles par d'autres programmes
      - "nani=true"

# Définition des réseaux
networks:
  www: # nom dans l'assemblage
    external: true
    name: www # nom global
```

## Proxy

On utilise un proxy pour faire le biais entre le traffic entrant et nos conteneurs.
Ex: une requête pour tide.isenengineering.fr m'est donné, je passe par le proxy, 
le proxy va chercher dans les conteneurs celui qui a l'étiquette tide.isenengineering.fr.

Notre proxy est [Traefik](https://traefik.io),
mais il en existe plusieurs NGINX, APACHE, CADDY ou PINGORA.

La configuration est assez simple avec Traefik, on configure les différentes routes avec des étiquettes,
et traefik étant dans le même réseau, lis toutes les étiquettes en temps réels.

+ Traefik regarde choisir le port tout seul même pas besoin de le préciser.
([s'il y a plusieurs il choisit le plus faible, sinon faut préciser](https://doc.traefik.io/traefik/reference/install-configuration/providers/docker/#port-detection))

Dans votre docker-compose.yml ça ressemble à ça

```yml
services:
  votre-service:
    # ...
    labels:
      # Ce conteneur est accessible par l'extérieur
      - "traefik.enable=true" 
      # Où
      - "traefik.http.routers.votre-service.rule=Host(`ma-route.isenengineering.fr`)"
      # Où le traffic entre (port 443 avec TLS / en https)
      - "traefik.http.routers.odoc-deno.entrypoints=websecure"
    networks:
      - www

networks:
  www:
    # On connecte le réseau sur lequel Traefik écoute les changements et accède aux conteneurs
    # sans ça, Traefik ne peut communiquer avec le conteneur
    external: true
    name: www
```

[Documentation](https://doc.traefik.io/traefik/reference/routing-configuration/other-providers/docker/#udp-routers)
*sur cette page, il y a toutes les étiquettes qui existent*
