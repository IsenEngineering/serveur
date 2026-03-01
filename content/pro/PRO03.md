+++
date = '2026-03-01T13:39:01+09:00'
draft = true
title = 'Conteneurs'
+++

# Procédures conteneurs

## Tidee
configuration à `/home/pod/tide`

Vous pouvez configurer Tidee via le `docker-compose.yml`
puis faire `pod compose up -d` pour le redémarrer. Les variables d'environments sont dans `.env`.

## Documentation Serveur
configuration à `/home/pod/doc-serveur`

> Pour mettre à jour le contenu (text/markdown) de la documentation du serveur, il n'est pas nécessaire de faire quelque chose sur le serveur. Veuillez suivre [la procédure suivante](/pro/PRO02.md).

Vous pouvez configurer la documentation via le `docker-compose.yml`.
`.env` contient la clé donné à Github pour authentifié les requêtes venant des webhooks.
`keys/` contient les clés privées et publiques pour récupérer le code source de github (le dépôt étant privé)

Au lieu de charger le code source sur le serveur, je construis l'image du conteneur sur ma machine et je l'envoie.

*Machine locale*
1. `git clone https://github.com/IsenEngineering/serveur.git && cd serveur`
2. `docker buildx build --platform linux/amd64 -t loshido/doc-serveur .` (le serveur est sous x86 donc l'architecture linux/amd64 fonctionnera)
3. `docker image save -o ./doc.tar loshido/doc-serveur`
4. `tar -czf doc.tar.gz doc.tar && rm doc.tar`
5. `scp doc.tar.gz ie:/home/livio.ardoin && rm doc.tar.gz` remplacer `livio.ardoin` par votre nom d'utilisateur (pas administrateur), ie est ma configuration pour me connecter au serveur de l'ie en tant que livio.ardoin avec ma clé ssh.

*Serveur IE*
1. `tar -xzf doc.tar.gz && rm doc.tar.gz`
2. `su livio.ardoin.admin`
3. `sudo chown pod:pod doc.tar && sudo mv doc.tar /home/pod/`
4. `su - pod`
5. `pod image load -i doc.tar && rm doc.tar`

puis il reste plus qu'à redémarrer le serveur et supprimer l'image obselète.

## Site de l'IE
configuration à `/home/pod/site`

documentation à commencer

## Traefik (proxy)

configuration à `/home/pod/traefik`

suivre la documentation [ici](/doc/DOC03.md)

> *Livio A, 05/10/25*