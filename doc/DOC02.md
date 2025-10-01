[accueil](/readme.md)

# Modifier la doc.

## Introduction à la documentation

*Je me suis chauffé pour faire un système sympa (challenge pour moi-même).*
Concrètement, la documentation s'écrit en markdown (un language de balisage rapide).
L'un des grands avantages c'est qu'on n'a pas à penser à autre chose que le contenu du fichier lorsqu'on l'écrit.

On suit une nomenclature pour s'assurer que la documentation reste propre.
> #### Nomenclature
> PROXX -> Procédure N°XX\
> DOCXX -> Documentation N°XX\
> INFXX -> Fiche d'information N°XX

On utilise le système de pull-request pour ajouter ou retirer des documents dans la documentation. Les pull-requests pour la branch `production` déclencheront un webhook qui mettra à jour le serveur automatiquement.

La documentation contient 3 types de documents
- **Procédures**
- **Documentations**
- **Fiches d'informations**

## Comment



1. vous devez suivre la nomenclature pour la nomination des fichiers.
2. **déclarer** le fichier dans sa catégorie dans le readme.
3. **écrire** votre fichier au bon endroit. (`doc/`, `inf/`, `pro/`)
4. **envoyer** vos modifications sur une branche
5. faire une [pull-request](https://github.com/IsenEngineering/serveur/pulls) pour l'inclure sur la branche `production`