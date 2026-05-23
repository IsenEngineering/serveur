+++
date = '2026-03-01T13:39:01+09:00'
title = 'Système de documentation'
tags = ["docker", "git"]
weight = 1
author = "Loshido"
+++

Le dépôt github se situe [ici](https://github.com/IsenEngineering/serveur), si vous n'y avez pas accès et que vous devez y accéder veuillez demander l'accès au pôle serveur.

## Quoi

Le système de documentation du pôle serveur est conçu pour permettre la délégation et la durabilité des connaissances du pôle serveur de l'IsenEngineering.

## Pourquoi

L'idée c'est que cette documentation reste publique afin que ceux qui souhaitent apprendre puissent s'appuyer sur une ressource et apprendre des erreurs passées.

Cette documentation est facile d'accès, peut être mise à jour régulièrement assez simplement et ne coûte rien à hébérger.

## Comment

Voici les étapes à suivre pour que vos modifications soient prises en compte.

{{% steps %}}

### Etape 1 - Fork

Fork [le répértoire](https://github.com/IsenEngineering/serveur) (vous créez une copie du dépôt sur votre compte),

### Etape 2 - Checkout

Créer une nouvelle branche avec le nom de votre modification,\
Sur cette branche vous pouvez faire vos modifications librement.

### Etape 3 - Pull Request

Enfin vous devrez proposer une pull request sur le [dépôt de l'IsenEngineering](https://github.com/IsenEngineering/serveur/).
{{< callout type="info" >}}
Nous vous prions de bien indiquer quels changements / modifications vous avez apporté dans les encadrés à cet effet. Exemple: "title of the pull request" -> il faut écrire qu'est-ce que vous proposez, fix/feat/doc/... avec un titre
{{< /callout >}}

### Etape 4 - Review

Le responsable en charge se mettra alors à revoir vos modifications afin de corriger de potentiels erreurs ou autre. Pour enfin "merge" vos modifications avec le code source principal.

{{% /steps %}}


{{< callout type="important" >}} 
Chaque document de la documentation en ligne devra également être téléversé sur le drive des responsables dans le répértoire du pôle.
{{< /callout >}}


## Maintenance et Développement

Cette documentation utilise [gohugo](https://gohugo.io), c'est rapide et efficace.\
Pour le développement et la maintenance, au lieu d'installer `golang` et `hugo`, j'ai mis à disposition des [images docker](https://github.com/orgs/IsenEngineering/packages?repo_name=serveur) à disposition pour éviter d'avoir à installer puis désinstaller des dépencences et pour éviter des problèmes de compatibilités.

### Serveur de développement

```sh
# On clone le code dans son environnement
git clone https://github.com/isenengineering/serveur.git && cd ./serveur
# On démarre le serveur avec un conteneur docker.
#  - on lie le répértoire courant avec le conteneur
#  - on expose le port 1313 du conteneur
docker run -it -v .:/doc-ie -p 1313:1313 ghcr.io/isenengineering/serveur:dev
```

### Serveur de production

```sh
# On démarre le serveur de production avec un serveur http
#  - le site est généré à la construction de l'image
docker run -it -p 80:80 ghcr.io/isenengineering/serveur
```

---


## Construction

Pour générer les images vous pouvez suivre ces guides

### Serveur de production

```sh
# Construction de l'image du serveur de développement 
# (darkhttpd + site ~500ko)
docker build -f build.Dockerfile -t ghcr.io/isenengineering/serveur .

# ou en précisant la plateforme (ex: linux/amd64, linux/arm64...)
docker buildx build --platform linux/amd64 -f build.Dockerfile -t ghcr.io/isenengineering/serveur .
```
### Serveur de développement

```sh
# Construction de l'image du serveur de développement 
# (go + hugo + git ~300mo)
docker build -f dev.Dockerfile -t ghcr.io/isenengineering/serveur:dev .

# ou en précisant la plateforme (ex: linux/amd64, linux/arm64...)
# particulièrement utile lorsque vous êtes sur une autre architecture (macos arm pour éxécuter sur amd64)
docker buildx build --platform linux/amd64 -f build.Dockerfile -t ghcr.io/isenengineering/serveur:dev .
```

### Envoyer les images sur github

```sh
# Le serveur de production
docker push ghcr.io/isenengineering/serveur

# Le serveur de développement
docker push ghcr.io/isenengineering/serveur:dev
```