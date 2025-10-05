[accueil](/readme.md)

# Créer une clé ssh

```bash
ssh-keygen
# > Choisir l'emplacement de la clé
# > Choisir un mdp (passphrase)
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

Ainsi `ssh ie` fera la même chose que \
`ssh -I /chemin/vers/cle/privee utilisateur@111.222.233.244`
