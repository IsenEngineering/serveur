+++
date = '2026-03-15T13:39:01+09:00'
title = 'JavaScript'
tags = []
weight = 99
+++

## Installation
{{< tabs >}}

  {{< tab name="bun" >}}
    ```bash
    bun i surrealdb
    ```
  {{< /tab >}}
  {{< tab name="pnpm" >}}
    ```bash
    pnpm install surrealdb
    ```
  {{< /tab >}}
  {{< tab name="npm" >}}
    ```bash
    npm install surrealdb
    ```
  {{< /tab >}}

{{< /tabs >}}

## Authentification

{{< tabs >}}
{{< tab name="Avec un compte utilisateur" >}}
Les comptes utilisateurs sont accessibles avec une addresse isen et un mot de passe (s'il est généré). Généralement il est généré pour les responsables mais il peut être généré pour des utilisateurs lambda; mais leur privilèges ne leurs permettent pas de faire d'autres actions que de récupèrer leurs données.

```ts
const db = new Surreal();
// connexion non-authentififée
await db.connect('ws://tide-db.isenengineering.fr', {
	namespace: "tidee",
	database: "data"
});

// authentification avec "access"
await db.signin({
	access: "membres",
	variables: {
		email: "???.???@isen.yncrea.fr",
		password: "??????"
	}
});
```
  {{< /tab >}}
  {{< tab name="Avec un compte de service" >}}
Les comptes de service sont les comptes administrateurs de niveau root/namespace/database

```ts
import Surreal from 'surrealdb';

// Nouvelle instance SurrealDB
const db = new Surreal();

await db.connect('ws://tide-db.isenengineering.Fr', {
	namespace: "tidee",
	database: "data",
	authentication: {
		username: '????',
		password: '????'
	}
});
```
  {{< /tab >}}
  {{< tab name="Avec un jeton" >}}
la méthode `signin` génère un JWT qui peut être utiliser pour s'authentifier sans avoir à reentrer un mot de passe

```ts
const db = new Surreal();

await db.connect('ws://tide-db.isenengineering.fr', {
	namespace: "tidee",
	database: "data"
});

const jwt = "????.????.????"
await db.authenticate(jwt);
```
  {{< /tab >}}

{{< /tabs >}}

## Tables et Enregistrements

La plus grande particularité de SurrealDB c'est les `record`, une façon d'identifié chaque ligne de la base de données.

```js
import { RecordId } from 'surrealdb';

const pole = new RecordId("poles", "karting"); // record existant
const nouveauResponsable = new Record("membres", "u4x8ifvkl198dmhsr8sd"); // record fictif

const requete = `UPDATE $pole SET responsables = array::concat(
    $pole.responsables, 
    [$resp]
);`;
await db.query(requete, { pole, resp: nouveauResponsable }).collect();

```