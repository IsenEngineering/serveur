+++
date = '2026-03-15T13:39:01+09:00'
title = 'Authentification'
weight = 1
tags = []
+++

## Comptes

Il existe deux types de compte dans SurrealDB

1. Les comptes de services avec généralement un accès administrateur (root/namespace/database). Donc un compte avec des accès sur toutes l'infrastructure, sur toute le namespace en question ou sur une unique base de données dans un unique namespace.

2. Les comptes utilisateurs (record users), des utilisateurs "virtuelles" qui sont validées pendant le runtime*. Lors de l'authentification de ces utilisateurs, la base de données fait une requête spécifique qui vérifie si l'utilisateur est véritablement qui il prétend être.

Sur Tidee la requête authentifie les comptes utilisateurs (par la page de connexion de la plateforme) est la suivante:
```sql
SELECT * 
FROM membres 
WHERE email = $email
AND crypto::argon2::compare(pass, $password) 
-- On compare si le hash match avec le mot de passe donné.
```

Si cette requête renvoie une ligne, on donne à l'utilisateur un JWT (SurrealDB le fait par lui-même)

## Authentification

Une fois connecté vous recevrez un JWT qui vous permettra de vous connectez sans mot de passe. Il faudra le mentionner dans le Header "Authorization" de vos requêtes API ou le mentionner dans votre instance SurrealDB en utilisant la méthode authentificate.