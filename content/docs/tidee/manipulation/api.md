+++
date = '2026-03-15T13:39:01+09:00'
title = 'API'
weight = 2
tags = []
+++

Si vous rencontrez des problèmes, vous devez vous référer à [cette documentation](https://surrealdb.com/docs/surrealdb/integration/http)

## Endpoints

| Méthode | Chemin | Effet |
| --- | --- | --- |
| `GET` | [`/status`](https://surrealdb.com/docs/surrealdb/integration/http#status) | Renvoie 200 Si la base de données tourne. |
| `GET` | [`/health`](https://surrealdb.com/docs/surrealdb/integration/http#health) | Renvoie 200 Si la base de données fonctionne. |
| `GET` | [`/version`](https://surrealdb.com/docs/surrealdb/integration/http#version) | Renvoie la version de la base de données. |
| `POST` | [`/import`](https://surrealdb.com/docs/surrealdb/integration/http#import) | Importer des données dans un namespace et une bdd. |
| `POST` | [`/export`](https://surrealdb.com/docs/surrealdb/integration/http#export) | Exporter les données d'un namespace et une bdd. (très utile pour les backups). |
| `POST` | [`/signin`](https://surrealdb.com/docs/surrealdb/integration/http#signin) | Se connecter avec des identifiants et renvoie un JWT ([voir authentification](./auth.md)) |
| `POST` | [`/sql`](https://surrealdb.com/docs/surrealdb/integration/http#sql) | Executer une requête SQL |

Il existe d'autres endpoints pour plus de précisions [voir documentation](https://surrealdb.com/docs/surrealdb/integration/http)