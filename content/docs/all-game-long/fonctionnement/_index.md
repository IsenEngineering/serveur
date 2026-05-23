+++
date = '2026-05-23T13:39:01+09:00'
author = "Loshido"
+++

## Stack technique

Ce projet a été initialement démarré avec [Qwik](https://qwik.dev) un framework [Vite](https://vite.dev). La particularité de Qwik est que le frontend et très proche du backend, vous pouvez retrouver du code front et back dans le même fichier. *(+[tailwindcss](https://tailwindcss.com))*


La base de données est une simple instance postgres.
On utilise aussi un key-value store (kv) en mémoire.

## Fonctions

{{< callout type="important" >}} 
  Todo (j'ai vraiment la flemme d'écrire tout ça)
{{< /callout >}}

{{< cards >}}
  {{< card link="./inscriptions" title="Inscriptions" >}}
  {{< card link="./autorisations" title="Autorisations" >}}
  {{< card link="./virements" title="Virements" >}}
  {{< card link="./historique" title="Historique" >}}
  {{< card link="./deconnexion" title="Déconnexion" >}}
  {{< card link="./retraits" title="Retraits" >}}
  {{< card link="./administrateurs" title="Administrateurs" >}}
  {{< card link="./matchs" title="Matchs" >}}
  {{< card link="./confettis" title="Confettis" >}}
{{< /cards >}}

## Organisation du projet

{{< filetree/container >}}
    {{< filetree/folder name="adapters" state="closed" >}}
    {{< /filetree/folder >}}
    {{< filetree/folder name="db" state="closed" >}}
    {{< /filetree/folder >}}
    {{< filetree/folder name="src" >}}
        {{< filetree/folder name="assets" state="closed" >}}
        {{< /filetree/folder >}}
        {{< filetree/folder name="components" state="closed" >}}
        {{< /filetree/folder >}}
        {{< filetree/folder name="components" state="closed" >}}
        {{< /filetree/folder >}}
        {{< filetree/folder name="lib" state="closed" >}}
        {{< /filetree/folder >}}
        {{< filetree/folder name="routes" state="closed" >}}
        {{< /filetree/folder >}}
        {{< filetree/file name="entry.bun.ts" >}}
        {{< filetree/file name="root.tsx" >}}
    {{< /filetree/folder >}}
    {{< filetree/file name="vite.config.ts" >}}
{{< /filetree/container >}}

### `src/lib`

Le dossier `src/lib` contient tous les outils de la plateforme à savoir: connexion avec la base de données, jwt, hashage...

- `argon.ts` >> hasher et comparer des mots de passe.
- `cookie.ts` >> centralisation des cookies.
- `jwt.ts` >> signer et vérifier des JWT
- `kv.ts` >> KV
- `pg.ts` >> connexion avec la base de données (pool)

### `src/routes`

Le dossier `src/routes` contient tous les endpoints de la plateforme.

- `404.tsx` >> Page servit si la page demandée n'existe pas.
- `layout.tsx` >> Page servit lorsqu'on demande l'un des endpoints enfants du dossier.... ([documentation Qwik](https://qwik.dev/docs/routing/#layouttsx-files))
- `index.tsx` >> Page servit lorsqu'on demande le dossier parent.
- `.../[parametre]/...` >> `[parametre]` est dynamique.
- `a/(chemin-ignore)/b/index.tsx` >> La page est servit à `/a/b`.