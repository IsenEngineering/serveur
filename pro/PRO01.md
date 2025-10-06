| [accueil](/readme.md) |
| --- |

# Création de comptes

## Introduction

On distingue 3 groupes de comptes,
- **Les comptes de services**
- **Les comptes utilisateurs**
- **Les comptes administrateurs**

Les seuls comptent ayant les droits sudo sont les comptes administrateurs.\
*Les comptes utilisateurs ont un UID & un GID qui doit être identique.

## Créer un compte de service

> ATTENTION, la création d'un compte de service (exemple: pod/dockeruser) 
> doit nécessité une raison pertinente.

Les UID & GID des comptes de service sont reservés sur l'intervalle **1000-1999**

### Commandes

```bash
sudo useradd -u 1001 -g 1001 -s /bin/bash -c "Compte qui sert à ..." -m user
sudo passwd user
> ???
```

## Créer un compte utilisateur

Les UID & GID des comptes utilisateurs sont réservés sur l'intervalle **2000-5999**\
*Exemple: le compte louis.arnaud -> UID 2000, GID 2000*

### Commandes

```bash
sudo useradd -u 2000 -g 2000 -s /bin/bash -c "Resp. du Pôle serveur 2023-2025" -m louis.arnaud
sudo passwd louis.arnaud
> ???
echo "<clé publique>" > /home/louis.arnaud/.ssh/authorized_keys
```

*Pensez à changer le mots de passe à la première connexion (avec `passwd`)*

## Créer un compte administrateur

Les UID & GID des comptes administrateurs sont réservés à l'intervalle **6000-6999**

> ATTENTION, pour des raisons de sécurités, **ne pas mettre de clé SSH sur ces comptes**

### Commandes

```bash
sudo useradd -u 6000 -g 6000 -s /bin/bash -c "Compte ADMIN" -m louis.arnaud.admin
sudo usermod -aG sudo louis.arnaud.admin
sudo passwd louis.arnaud.admin
> ???
```
