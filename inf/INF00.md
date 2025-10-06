| [accueil](/readme.md) |
| --- |

# Titre
## Titre 2
### Titre 3
#### Titre 4
...

Un paragraphe simple
Du texte avec une **mise en forme** pour *nuancer* et ~attirer~ l'oeil.

Passage à la ligne\
forcée

Passage à la ligne
non-forcée

Code dans une ligne `char msg[13] = "Hello, World";`

## Listes

* Liste non-numérotée
* second element
* ...

1. Liste numérotée
2. second element
3. ...

- [ ] foo
- [x] bar

## Code

```c
typedef struct Point2D {
    int x;
    int y;
    struct Point2D* suiv;
}
void affichage(Point2D* liste) {
    Point2D *tmp = liste;
    while(tmp != NULL) {
        printf("%d,%d\n", tmp->x, tmp->y);
        tmp = tmp->suiv;
    }
}
```

## Tableau

| Tableau | Avec entêtes | Facile à faire |
| --- | --- | --- |
| A | 1 | z |
| B | 2 | q |

## Liens
### Liens en colonnes

[Lien vers une page](/readme.md)

[Lien vers google](https://google.com)

### Liens en lignes

[INF00](/inf/INF00.md)
[INF01](/inf/INF01.md)

## Images
![IE](/assets/ie.webp)

## Blocs

> Bloc de texte\
> ...

> [!NOTE]
> Notes

> [!TIP]
> Aides

> [!IMPORTANT]
> Notes importantes

> [!WARNING]
> Avertissement

> [!CAUTION]
> Attention

> *Livio A, 05/10/25*