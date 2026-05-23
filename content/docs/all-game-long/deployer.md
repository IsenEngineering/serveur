+++
date = '2026-05-23T13:39:01+09:00'
weight = 3
author = "Loshido"
+++

# Déployement

## Variable d'environnements

Avant toutes prises en mains du projet, vous devez créer un fichier .env dans votre environnement

| Variable | Valeur par défaut | Explication |
| --- | --- | --- |
| `DEV` | `false` | Assertion pour savoir s'il faut afficher certaines informations de debug | 
| `DOMAIN` | `localhost` en dev ou `agl.isenengineering.fr` en prod | Le domaine pour lequel les JWT sont signés | 
| `POSTGRES` | x | Le connection string qui permet au client du serveur de se connecter à la base de données |
| `POSTGRES_PASSWORD` | x | Le mot de passe de l'utilisateur par défaut de la base de données (`postgres`) |
| `HASH_SECRET` | x | Le secret utilisé pour hasher les mots de passe |
| `JWT_SECRET` | x | Le secret utilisé pour signer les JWT |
| `DEFAULT_AGL` | `10000` | la quantité d'agl donné aux participants à l'inscription |

*Exemple*
```.env
DEV=false
DOMAIN=localhost
POSTGRES=postgres://postgres:?1?@localhost:5432/postgres

POSTGRES_PASSWORD=?1?
HASH_SECRET=?2?
JWT_SECRET=?3?

DEFAULT_AGL=10000
```
{{< callout >}}
Vous pouvez générer des secrets aléatoires avec cette commande<br/>
`openssl rand -base64 32` >> `oq8YQQQyypvPjcS4BEo3REpVfz2jg7+VKTsRu+pS1nI=`
{{< /callout >}}

## Production

Les images de la plateformes sont déployées sur github sous cette addresse `ghcr.io/loshido/agl-bet`

Voici un exemple de `docker-compose.yml` pour déployer la plateforme
```yml
services:
  db:
    # dans le connection string dans .env, vous pouvez utiliser `db` 
    # comme domaine pour la base de données.
    # ex: `postgres://user:pass@db:5432/postgres`
    env_file:
      - .env
    environment:
      - PGDATA=/var/lib/postgresql/data/pgdata
    image: postgres:18-alpine
    container_name: agl-db
    volumes:
      - ./db/init:/docker-entrypoint-initdb.d
      - ./db/data:/var/lib/postgresql/data
    # Pour initialiser la base de données correctement,
    # vous devez créer un répértoire `db` et `db/init`
    # et y déposer les requêtes d'initialisations
    restart: always
  web:
    env_file:
      - .env
    ports:
     - 80:80
    image: ghcr.io/loshido/agl-bet 
    # Ici vous pouvez ajouter une tag pour spécifier la version de l'image 
    # que vous souhaitez, ex: `ghcr.io/loshido/agl-bet:latest`
    container_name: agl-bet
    restart: always
```

Vous pouvez retrouver les requêtes d'initialisations dans le dépôt à `db/init`.

## Base de données

Lorsque vous aurez déployer la plateforme la base de données sera vide,
Pour créer un utilisateur administrateur, vous devez créer un compte en allant sur la plateforme. Une fois créer, votre compte sera en "attente" de validation comme tous les participants qui s'inscriveront pendant l'évènement.

Maintenant, il faut que vous vous connectiez à la base de données et modifiez les rôles votre compte pour avoir accès à la plateforme et que vous poussiez mettre d'autres administrateurs sans avoir besoin d'accéder à la base de données.

Pour procéder vous devez rentrer dans le conteneur de la base de données.

`pod exec -it agl-bet sh` permet de faire ça. 
> `agl-bet` corresponds au nom du conteneur, `sh` est le programme que l'on veut éxécuter, `-it` permet d'intéragir avec la commande qu'on a envoyé, `pod` corresponds au podman de l'environnement du serveur de l'IsenEngineering mais vous pouvez le remplacer par `docker` dans la plupart des cas.

`su postgres`
> `su` pour changer d'utilisateur, `postgres` est l'utilisateur qui permet d'intéragir avec la base de données.

`psql`
> `psql` est un client postgres.

```sql
UPDATE utilisateurs 
SET roles = '["user", "admin", "root"]' 
WHERE pseudo = 'votre-pseudo';
```

> La requête SQL pour changer vos rôles, `admin` permet d'être administrateur, `root` permet de faire des actions qui requierts plus de privilèges qu'un administrateur ex: ajouter d'autres administrateurs.