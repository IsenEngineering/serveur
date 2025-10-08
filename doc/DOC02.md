| [accueil](/readme.md) | [documentation proxy](/doc/DOC03.md) |
| --- | --- |

# Documentation conteneurs/services

## Introduction

> [!CAUTION]
> Veuillez ne pas manipuler avant de comprendre.

On utilise [podman](https://podman.io), un équivalent très proche de [docker](https://docker.com) (toutes les commandes docker fonctionnent avec podman, `docker ps` -> `podman ps`).

Un protocole de sécurité a été mis en place pour réduire l'impact de potentiels attaques depuis les conteneurs. Vous devez donc utiliser l'utilisateur de service `pod` pour intéragir avec les conteneurs.

**passage en utilisateur pod**

1. `su - pod` -> (Mots de passe à demander au responsable du pôle serveur + **le tiret génère une nouvelle session ce qui est nécessaire** pour avoir les permissions `pod` à la place des votres)
2. `cd` ou `cd /home/pod` -> Aller dans l'espace reservé aux conteneurs.

Maintenant vous pourrez utiliser la commande `pod` (`alias pod=podman`)

## Commandes basiques

| Commande | ? |
| --- | --- |
| `pod images` | Liste les images stockées |
| `pod rmi [image]` | Supprime une image |
| `pod ps` | Montre les conteneurs |
| `pod ps -a` | Montre tous le conteneurs (même ceux arrêtés) |
| `pod stop [conteneur]` | Arrête un conteneur |
| `pod rm [conteneur]` | Supprime un conteneur |
| `pod run [...paramètres] [image]` | Démarrer un conteneurs (ou utiliser un docker-compose) |
| `pod compose up -d` | Démarrer des conteneurs à l'aide d'un fichier de configuration (docker-compose.yml) |
| `pod compose down` | Eteins les conteneurs du fichier de configuration |

### Exemple de Docker-compose

```yml
# Définitions des services/conteneurs
services:
  api: # nom du service dans l'assemblage
    env_file: # fichier qui contient des variables d'environnement
      - .env
    image: alpine:latest # image du conteneur
    container_name: api # nom du conteneur globalement
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
  db:
    image: postgres:alpine
    environment:
        POSTGRES_PASSWORD: Ahhhhh
    ports:
      - 5432:5432


# Définition des réseaux
networks:
  www: # nom dans l'assemblage
    external: true
    name: www # nom global
```

> *Livio A, 05/10/25*