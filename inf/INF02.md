# Migration Docker -> Podman & Nginx -> Traefik
Faite le 03/09/2025
avec une backup de tous les services critiques (goldenpath, tide & docmost)

## Pourquoi
L'idée c'est d'avoir une infrastructure simple, sécurisée et fiable

### Docker -> Podman
Docker a toutes les permissions (root) par défaut.
On est donc passé sur le mode rootless mais on a rencontré un autre problème,
le service qui permet de limiter les ressources d'un processus ne comprenait 
plus comment gérer les limites de docker. Ce problème empeché pour des raisons obscures
l'interaction avec des conteneurs en route. On a pas reussi à résoudre ce problème 
(au bout d'un moment, on en avait ras la casquette).

De plus, Docker est en mode "daemon", il tourne en arrière plan comme un unique processus.
Sur des articles de sécurités, ils parlent de "point unique de défaillance".
Podman en revanche tourne en rootless et chaque conteneur est un processus différent.
Sans compter que podman n'utilise que "runc", 
là où docker utilise "dockerd", "containerd" et "runc" (architecture).

Enfin, Podman s'aligne avec les standarts kubernetes,
on peut facilement générer des configs kube des conteneurs.
Cela pourrait être utile pour les membres du pôle serveur qui souhaite aller plus loins.
NE PAS METTRE KUBERNETES SUR LE SERVEUR DE L'IE SVP, ça sert à rien.

### Nginx -> Traefik
Nginx et Traefik sont des proxies,
ils prennent les requêtes qui rentrent dans le serveur,
cherche à quelle service ces requêtes s'addressent puis les envoient au bon endroit.

Dans nginx, pour savoir à quelle service s'addresse chaque requête,
on doit écrire des configurations pour chaque app dans /etc/nginx/sites-enabled/...
C'est dommage parce qu'on a une dizaine de services, donc 10 fichiers 
exactement pareil où seulement 10 caractères changent.
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
 - Nouvelle utilisateur pod qui remplace dockeruser. Le mots de passe associé est "pod-user" 
 - Ajout de podman
 - Ajout du conteneur Traefik
 - Suppression de docker
 - Suppression du groupe docker

## Documentations
 - [todo]()
