+++
date = '2025-09-03T13:39:01+09:00'
title = 'Migration vers Traefik'
+++

Migration de docker à podman et de Nginx à Traefik\
avec une backup de tous les services critiques (goldenpath, tide & docmost)

## Pourquoi
L'idée c'est d'avoir une infrastructure simple, sécurisée et fiable.

Avec Nginx, on devait écrire des configuration de ~10/20 lignes par service et redémarrer manuellement nginx. Le souci était qu'en faisant des scripts d'automatisation, on ne faisait que complexifier la mise en production.\
Passer à Traefik a significativement simplifier la mise en production.

En ce qui concerne le passage à Podman, nous soutions depuis un moment déjà passer en rootless pour protéger un minimum nos ressources mais en passant docker en rootless, on a fait fasse à plus gros problème qui nous a poussé à devoir désintaller docker. J'ai alors fais le choix de passer à Podman l'architecture de celui-ci semblant plus adapté à nos besoins.

### Nginx -> Traefik
Nginx et Traefik sont des proxies,
ils prennent les requêtes qui rentrent dans le serveur,
cherche à quelle service ces requêtes s'addressent puis les envoient au bon endroit.

Dans nginx, pour savoir à quelle service s'addresse chaque requête,
on doit écrire des configurations pour chaque app dans /etc/nginx/sites-enabled/...
C'est dommage parce qu'on a une dizaine de services, donc 10 fichiers 
très similaires où seulement 10 caractères changent.
Sans compter que l'on doit redémarrer nginx pour que les changements soient pris en compte.

Traefik peut fonctionner de la même manière mais couplé à docker (podman en l'occurence)
il peut lire les meta-données des conteneurs et déduire quelle requête lui addresser.
Par exemple, on peut créer un conteneur pour tide avec le libellé (label) 
`traefik.http.routers.tide.rule=Host(\`tide.isenengineering.fr\`)`, 
Traefik comprends que les requêtes venant depuis tide.isenengineering.fr 
devront être addresser à ce conteneur. Traefik trouve le port du conteneur tout seul.

+ HTTP3

## Nouveautés
 - Backup des données/configurations docker/nginx dans /home/dockeruser/backup-migration
 - Nouvelle utilisateur pod qui remplace dockeruser.
 - Ajout de podman
 - Ajout du conteneur Traefik
 - Suppression de docker
 - Suppression du groupe docker