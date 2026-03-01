+++
date = '2026-03-01T13:39:01+09:00'
title = 'Guide Markdown'
+++

## Titres
{{< tabs >}}
{{< tab name="Markdown" >}}
```md
# Titre 1
## Titre 2
### Titre 3
#### Titre 4
```
{{< /tab >}}
{{< tab name="Rendu" >}}
# Titre 1
## Titre 2
### Titre 3
#### Titre 4
...
{{< /tab >}}
{{< /tabs >}}

## Paragraphes

{{< tabs >}}
{{< tab name="Markdown" >}}
```md
Un paragraphe simple
Du texte avec une **mise en forme** pour *nuancer* et ~attirer~ l'oeil.

Passage à la ligne\
forcée

Passage à la ligne
non-forcée

Code dans une ligne `char msg[13] = "Hello, World";`
```
{{< /tab >}}
{{< tab name="Rendu" >}}
Un paragraphe simple
Du texte avec une **mise en forme** pour *nuancer* et ~attirer~ l'oeil.

Passage à la ligne\
forcée

Passage à la ligne
non-forcée

Code dans une ligne `char msg[13] = "Hello, World";`
{{< /tab >}}
{{< /tabs >}}


## Listes

{{< tabs >}}
{{< tab name="Markdown" >}}
```md
* Liste non-numérotée
* second element
* ...

1. Liste numérotée
2. second element
3. ...

- [ ] foo
- [x] bar
```
{{< /tab >}}
{{< tab name="Rendu" >}}
* Liste non-numérotée
* second element
* ...

1. Liste numérotée
2. second element
3. ...

- [ ] foo
- [x] bar
{{< /tab >}}
{{< /tabs >}}



## Code

{{< tabs >}}
{{< tab name="Markdown" >}}
```md
```c
typedef struct Point2D {
    int x;
    int y;
    struct Point2D* suiv;
}
```
{{< /tab >}}
{{< tab name="Rendu" >}}
```c
typedef struct Point2D {
    int x;
    int y;
    struct Point2D* suiv;
}
```
{{< /tab >}}
{{< /tabs >}}

## Tableau

{{< tabs >}}
{{< tab name="Markdown" >}}
```md
| Tableau | Avec entêtes | Facile à faire |
| ------- | ------------ | -------------- |
| A       | 1            | z              |
| B       | 2            | q              |
```
{{< /tab >}}
{{< tab name="Rendu" >}}
| Tableau | Avec entêtes | Facile à faire |
| --- | --- | --- |
| A | 1 | z |
| B | 2 | q |
{{< /tab >}}
{{< /tabs >}}


## Liens

{{< tabs >}}
{{< tab name="Markdown" >}}
```md
// Colonnes

[Lien vers une page](/readme.md)

[Lien vers google](https://google.com)

// Lignes

[INF00](/inf/INF00.md)
[INF01](/inf/INF01.md)
```
{{< /tab >}}
{{< tab name="Rendu" >}}

// Colonnes

[Lien vers une page](/readme.md)

[Lien vers google](https://google.com)

// Lignes

[INF00](/inf/INF00.md)
[INF01](/inf/INF01.md)
{{< /tab >}}
{{< /tabs >}}



## Images
{{< tabs >}}
{{< tab name="Markdown" >}}
```md
![IE](/images/ie.png)
```
{{< /tab >}}
{{< tab name="Rendu" >}}
![IE](/images/ie.png)
{{< /tab >}}
{{< /tabs >}}

## Autres

[Syntax Highlighting](https://imfing.github.io/hextra/docs/guide/syntax-highlighting/)

[Latex](https://imfing.github.io/hextra/docs/guide/latex/)

["Short code"](https://imfing.github.io/hextra/docs/guide/shortcodes/)