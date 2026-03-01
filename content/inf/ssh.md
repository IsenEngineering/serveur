+++
date = '2026-03-01T13:39:01+09:00'
title = 'Guide SSH'
+++

## Se connecter à un hôte distant

```bash
# Connexion à 10.66.66.1 avec l'utilisateur user
ssh user@10.66.66.1 
# Connexion à isenengineering.fr avec l'utilisateur user
# et le mot de passe password
ssh user:password@isenengineering.fr 
```

## Créer une clé ssh

```bash
ssh-keygen
# > Choisir l'emplacement de la clé
# > Choisir un mot de passe pour la clé (passphrase, peut être vide)
```

Il faudra partager **uniquement** le fichier en .pub (clé publique)
et garder l'autre (clé privée)

## Configuration SSH
Il est possible de préconfigurer des connexions pour ne pas avoir à reécrire à chaque fois l'addresse ou l'emplacement de la clé privée

```bash
# à ~/.ssh/config
Host ie
    Hostname 111.222.233.244
    User utilisateur
    IdentityFile /chemin/vers/cle/privee
```

Ainsi la commande `ssh ie` fera la même chose que \
`ssh -I /chemin/vers/cle/privee utilisateur@111.222.233.244`

La configuration globale de ssh est située sous linux à `/etc/ssh/...`