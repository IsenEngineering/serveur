+++
date = '2026-03-01T13:39:01+09:00'
title = 'Création de comptes'
linkTitle = "Comptes"
tags = ["gestion"]
+++

## Introduction

On distingue 3 groupes de comptes sur le serveur de l'IsenEngineering,
- **Les comptes de services**
- **Les comptes utilisateurs**
- **Les comptes administrateurs**

Les seuls comptent ayant les droits sudo sont les comptes administrateurs.

## Créer un compte de service

{{< callout type="error" >}}
la création d'un compte de service (exemple: pod/dockeruser) doit nécessité une raison pertinente.
{{< /callout >}}

Les UID & GID des comptes de service sont reservés sur l'intervalle **1000-1999**

```sh {filename=commandes}
sudo useradd -u 1001 -g 1001 -s /bin/bash -c "Compte qui sert à ..." -m user
sudo passwd user
> ???
```

## Créer un compte utilisateur

Les UID & GID des comptes utilisateurs sont réservés sur l'intervalle **2000-5999**\
> *le compte louis.arnaud -> UID 2000, GID 2000*

```sh {filename=commandes}
sudo useradd -u 2000 -g 2000 -s /bin/bash -c "Resp. du Pôle serveur 2023-2025" -m louis.arnaud
sudo passwd louis.arnaud
> ???
echo "<clé publique>" > /home/louis.arnaud/.ssh/authorized_keys
```

{{< callout type="info" >}}
Pensez à changer le mots de passe à la première connexion (avec `passwd`)
{{< /callout >}}

## Créer un compte administrateur

Les UID & GID des comptes administrateurs sont réservés à l'intervalle **6000-6999**

{{< callout type="error" >}}
pour des raisons de sécurités, **ne pas mettre de clé SSH sur ces comptes**
{{< /callout >}}

```sh {filename=commandes}
sudo useradd -u 6000 -g 6000 -s /bin/bash -c "Compte ADMIN" -m louis.arnaud.admin
sudo usermod -aG sudo louis.arnaud.admin
sudo passwd louis.arnaud.admin
> ???
```