# DNS intra Wireguard
05/09/2025

On a mit en place un réseau wireguard sur l'année 2024-2025,
Ce dernier permet d'avoir un réseau privée entre nos appareils et le serveur.
Par exemple: 10.66.66.1 <- serveur, 10.66.66.2 <- Louis, 10.66.66.3 <- Livio
et 10.66.66.1 peut parler avec 10.66.66.3 de façon très sécurisé.

Jusqu'à nouvel ordre, le réseau wireguard est considéré comme safe

## Pourquoi

L'objectif derrière la mise en place de ce réseau est de ne pas 
exposer des applications sensibles ou confidentielles.
La raison initiale était de ne pas exposer le teampass au publique,
Si du jour au lendemain, on trouvait une CVE sur teampass, nos mdps seraient en danger.
Tandis que si teampass n'est accessible que par le réseau wireguard, c'est safe.

## DNS

Maintenant c'est bien de pouvoir accéder au serveur via 10.66.66.1 
mais c'est relou pour ceux qui ne travaille pas sur le serveur, 
(il faut retenir les ips et ports des services).

D'où la mise en place d'un serveur DNS interne, 
pour ça on a utilisé dnsmasq connu pour sa simplicité.
En 8 lignes de configurations, on a notre DNS fonctionnel.

## Sous-domaines

`*.wg.ie` pointe vers 10.66.66.1 (le serveur)
comme on lit de gauche à droite ça fait :
<service>(*) par le wireguard (.wg) de l'isenengineering (.ie)

 - `proxy.wg.ie` <- Accès au dashboard de traefik
 - `pass.wg.ie` <- Accès au teampass (pas encore d'actualité)
 - `wg.wg.ie` <- Gestion du wireguard (pas encore d'actualité)
