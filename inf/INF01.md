# Etat du serveur le 3 Septembre 2025

Conteneurs docker
 - tide (Tidee)
 - tide-db (BDD de Tidee)
 - api-temp (Backend de l'app refonte de l'ent)
 - api-mail-db (comptes addresses emails pour Stalwart, le serveur mail 2024-2025)
 - goldenpath-reverse-proxy (nginx / reverse proxy)
 - doc (plateforme pour la doc)
 - doc-db
 - doc-redis
 - stalwart-mail-reborn (serveur mail 2024-2025)
 - webmail (webmail pour Stalwart)
 - discord-bot
 - status-kuma (page de status)
 - vieux-site-ie

Conteneurs éteints définitivements
 - api-mail-db <- backup dans api-mail-db.tar.gz
 - stalwart-mail-reborn <- backup dans stalwart-mail-reborn.tar.gz 
 - webmail 

 On arrête les conteneurs liés aux mails étant donné que 
 l'on a acquérit Google Workspace (gmail pour @isenengineering.fr)
