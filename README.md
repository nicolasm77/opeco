# OPECO Starter kit

## Présentation
Ce starter kit à pour but de regrouper tout les travaux développer par l'équipe et de les simplifier en automatisant certaines tâches et en fournissant un environement de développement local.
Il est entièrement basé sur [webpack](https://webpack.js.org/).

Liste des fonctionnalités :
* Compréssion du HTML
* Include de morceaux d'HTML
* Transformation des URLs local en URLs prod
* Transformation des caractères spéciaux en entités HTML
* Concaténation de tous les fichiers JS utilisés
* Compréssion du JS
* Compilation des fichiers SASS en CSS
* Concaténation de tous les fichiers CSS utilisés
* Suppression de tout le CSS non utilisé
* Optimisation des images (jpg, png et svg)
* Lazyloading des images
* Intégration du framework CSS boulanger et des bulles
* Intégration des scripts utiles (swiper, data-xiti, ...)
* ~~Envoi sur le FTP des fichiers générés~~
* ~~Application des CHMOD en 775 recursive sur les fichiers déposés en FTP~~

Il possède 2 environnements local:
* desktop
* sim

Chacun contenant le header, le footer et les fichers css présents sur ces 2 versions du site boulanger.com. Un *hot realoding* (rechargement de la page à chaque modifications de fichier inclus) est lancé automatiquement.


## Installation

1. Récupération du repo
```
git clone git@github.com:nicolasm77/opeco.git
```

3. Vérifier que npm est à jour
```
npm install -g npm@latest
```

4. Installation des dépendances
```
cd opeco
npm install
```

> Cette étape est longue à s'exécuter, mais elle n'est à faire qu'**une seule fois**.

## Structure
### _global
#### fonts
Dossier contenant les fichiers de la font _ARS_

#### loaders
Dossier contenant des scripts utilisé dans les configurations de webpack

#### structure_site
Dossier contenant

#### tpl_****
Dossiers contenants toutes sortes fichiers commun à un template

### evenements
Dossier contenant tout les travaux fait par l'équipe de devs marketing : portail, article vivre-mieux, page fidélité, BCBU, ...

### templates
Dossier contenant la base de chaque type de template. Ces dossiers sont à dupliquer lors de la création d'un évenement.

## Utilisation

### Création d'un évenement
Chercher le dossier souhaité dans `opeco/templates` et le copié-collé dans `opeco/evenements` puis le renomé.

### Commandes

**Les commandes sont à exécuter dans le dossier de l'évenement utilisé. Par exemple :**
```
opeco/evenements/braderie
```

Le starter dispose de 3 commandes d'initialisation:

1. Lancement du local *desktop*
```
npm run desk
```
Initialise un serveur local à l'adresse http://localhost:8080 avec hot reloading et l'apparence du site _desktop_ de boulanger. Dans ce cas, le traitement est minimal : les ressources (images, script, css, ...) ne sont pas optimisés.

2. Lancement du local *sim*
```
npm run sim
```
Initialise un serveur local à l'adresse http://localhost:8080 avec hot reloading et l'apparence du site _sim_ de boulanger. Dans ce cas, le traitement est minimal : les ressources (images, script, css, ...) ne sont pas optimisés.

3. Génération des fichiers pour la prod
```
npm run mep
```
Génère un dossier `dist` contenant tous les fichiers traités, concaténés et optimisés : ce sont les fichiers à mettre **directement sur le FTP**.

### Inclure des fichiers JS et CSS
Pour ajouter du CSS ou JS qui doit être concaténé, il faut importer le fichier dans `starter/src/index.js` de la manière suivante:

```js
import bubbleCSS from "bubbles/dist/main.css";
import bubbleAnim from "bubbles/dist/anims.js";
```

Le nom de l'import (*bubbleAnim*) n'est important que dans le cas d'un plugin JS, par exemple :
```js
import Swiper from "swiper/dist/js/swiper.min.js";
[...]
new Swiper('.swiper-container', {})
```

### HTML
Le fichier de base est `starter/src/index.html`.

Les includes sont à placer dans le dossier `starter/src/includes` et insérés de cette façon :

```js
${require('./includes/conv1.html')}
```
> **Attention les urls sont relatives donc dans ce ficiher `conv1.html` les images ont comme chemin : `../images/entree_gam.jpg` par exemple.**

### AJAX
Il est parfois nécessaire de généré des fichiers HTML qui sont appelés en Ajax pour être inclu dans une page; pour faire cela, il faut mettre ces fichiers HTML dans la racine de l'évenement et mettre le préfixe `ajax-` dans leur nom (par exemple : `opeco/evenements/ajax-menu2.html`)

### CSS
Le fichier de base est `starter/src/styles/style.scss`.


### URLs en prod
Pour que les fichiers aient la bonne URL en prod, il faut remplir la variable `stagingPath` tout en haut du fichier `starter/webpack.prod.js`. Par exemple :

```js
const stagingPath = "/content/static/bcom/evenements/2018/07_braderie";
```

### Images (jpg/png)
Les images sont à placer dans le dossier `starter/src/images` puis à utilisé avec l'URL `./images/***.jpg`. Pour que l'image soit "lazyloadé" il faut ajouté la *class* `lazyload`.
Exemple:

```html
<img src="./images/entree_gam.jpg" alt="Illustration gamme produits gros éléctroménager" class="prods__illu lazyload">
```

### SVGs
Les SVG sont à placer dans le dossier `starter/src/images` puis à utilisé avec l'URL `./images/***.svg`. Ils peuvent être injectés en tant que HTML (inline); utile par exemple dans le cas où une animation au survol doit être effectuée.
Pour utilisé le SVG en inline:

```js
${require('./images/essentielb.svg?inline')}
```

### PurgeCSS
PurgeCSS permet de retirer tout le CSS non utilisé du fichier final. Il se base sur ce qui est présent dans le fichier HTML principal.

Malheureusement si une *class* est ajoutée en javascript, elle sera retiré par PurgeCSS car elle n'est pas présente de base dans le HTML.
Pour palier à ce problème, 3 solutions :

1. ajouter `wl-` au debut du nom de la *class* (wl = whitelist)

2. ajouter la *class* dans le tableau du fichier `starter/src/loaders/whitelist.js`

3. ajouter une expression régulière au tableau `whitelistPatterns` présent dans le dossier `webpack.prod.js`
