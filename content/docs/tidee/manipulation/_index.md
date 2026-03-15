+++
date = '2026-03-15T13:39:01+09:00'
title = 'Manipulation'
tags = []
+++

Ce document explique comment intéragir avec la base de données de Tidee.

## Quoi

La base de données de Tidee utilise [SurrealDB](https://surrealdb.com/docs/),
Une base de données open source qui combine les fonctionnalités d’une base de données relationnelle, documentaire et graphique, tout en intégrant nativement un moteur de requête SQL avancé et une API REST/GraphQL, permettant aux clients de se connecter directement sans besoin d’un backend intermédiaire.

## Où

Vous pouvez directement contacter la base de données à l'adresse 
- [`https://tide-db.isenengineering.fr`](https://tide-db.isenengineering.fr), par défaut vous serez redigiré vers la documentation de SurrealDB. 
- [`https://tide-db.isenengineering.fr/version`](https://tide-db.isenengineering.fr/version) vous renverra la version de la BDD.

Exposer directement SurrealDB sur Internet sans pare-feu, en permettant aux clients de s’y connecter sans intermédiaire backend, simplifie l’architecture et accélère le développement, mais impose une configuration rigoureuse des permissions et de l’authentification pour éviter toute exposition accidentelle ou attaque ciblée.

## Comment

{{< cards cols="1" >}}
  {{< card link="./api" title="API Rest" icon="cube-transparent"
    tag="à utiliser en priorité"
    tagColor="red" tagIcon="cursor-click" >}}
{{< /cards >}}

{{< cards cols="2" >}}
  {{< card link="./js" title="JavaScript / Typescript / Nodejs" icon="cube" >}}
  {{< card link="./autre" title="Autres" icon="dots-horizontal" >}}
{{< /cards >}}

## Glossaire

| Mot | Signification |
| --- | --- |
| BDD | Base de Données |
| backend | On désigne le côté serveur qui n'est pas directement visible par un client |