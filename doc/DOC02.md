[accueil](/readme.md)

# Système de documentation

Le dépôt github se situe [ici](https://github.com/IsenEngineering/serveur), si vous n'y avez pas accès et que vous devez y accéder veuillez demander au pôle serveur ou directement au Bureau de l'isenengineering.

## Quoi, Où et Comment

Le système de documentation du pôle serveur est conçu pour permettre la délégation et la durabilité des connaissances du pôle serveur de l'IsenEngineering.

Le système est divisé en deux parties, 
1. le code/ la documentation source ([IsenEngineering/serveur](https://github.com/IsenEngineering/serveur))
2. l'hébergement de la documentation (le serveur de l'IE)

Pour faire simple, 
- on a des fichiers en markdown, 
- on les transforme en HTML (page internet) 
- et les distribuons.

## Variables d'environments

| Variable | Valeur par défaut | ? |
| --- | --- | --- |
| `GITHUB_WEBHOOK` | ... | Token associé aux webhooks github |
| `BASE_URL` | `https://doc-serveur.isenengineering.fr` | Adresse du serveur |
| `MARKDOWN_PATH` | `.` | Emplacement des fichiers markdown |
| `HTML_PATH` | `./dist` | Chemin de sortie des fichiers HTML |
| `DEBUG` | | Activation des logs (dans la console)  |
| `TEMPLATE_PATH` | `./template.html` | Chemin vers le template des pages |

## Fichiers

| fichier(s) | ? |
| --- | --- |
| **Static** |  |
| `readme.md` | Entrée de la documentation |
| `doc/**/*/.md` | Documentations |
| `inf/**/*/.md` | Informations |
| `pro/**/*/.md` | Procédures |
| `assets/**/*` | fichiers servies à `/assets/*` *(ex: css et logo)* |
| **Code** |  |
| `deno.json` | Configuration Deno (runtime js/ts) |
| `Dockerfile` | Image du conteneur (serveur) |
| `template.html` | Template de chacune des pages (logo, titre, date...) |
| `src/` | Code du serveur (génération des pages) |
| `src/serve.ts` | Distribution des fichiers via http |
| `src/markdown.ts` | Transformation de `.md` à `.html` |
| `src/git.ts` | Outils pour mettre à jour la documentation "on the fly" |
| `src/dev.ts` | Serveur de développement (rebuild à chaque changements + serveur) |

## Commandes disponibles

Pour faire ce système j'ai utilisé du typescript (rapide, pas casse tête) avec Deno (runtime ts/js). Pour développer en local, vous devrez installer [deno](https://deno.com) ou vous faire un conteneur de développement.

- `deno task dev`  démarre un serveur de développement, lorsque vous éditez/créez/supprimez un document, l'app reconstruit toutes les pages (c'est très très rapide).
- `deno task build` transforme le markdown en html et le place dans `/dist`
- `deno task serve` démarre un serveur (production) et reconstruit la doc lorsqu'il reçoit une mise à jour du dépôt github

> *Livio A, 05/10/25*