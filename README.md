# OPECO Starter kit

## Présentation
Ce starter kit à pour but de regrouper **tous les travaux** développés par l'équipe et de les simplifier en automatisant certaines tâches et en fournissant un environnement de développement local.
Il est entièrement basé sur [webpack](https://webpack.js.org/).

### Principe

Deux environnements locaux :
* desktop
* sim

Chacun contenant le header, le footer et les fichers CSS présents sur ces 2 versions du site boulanger.com. Un *hot reloading* (rechargement de la page à chaque modifications de fichier inclus) est lancé automatiquement.

### Liste des fonctionnalités
* Minification HTML
* Injection de fragments HTML
* Réécriture des chemins de fichiers statiques (src To dist)
* Encodage des caractères spéciaux en entités HTML
* Concaténation des fichiers JS
* Compression du JS
* Compilation des fichiers SASS en CSS
* Concaténation des fichiers CSS
* Suppression du CSS non utilisé
* Optimisation des images (jpg, png et svg)
* Lazyloading des images
* Intégration du framework CSS boulanger et des bulles (cf. index.js)
* Intégration des scripts Boulanger (swiper, data-xiti, etc.)

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
Dossier contenant des scripts utilisés dans les configurations de webpack

#### structure_site
Dossier contenant l'encapsuleur HTML (pour hériter des CSS/JS existants)

#### tpl_****
Dossiers contenants les fichiers communs à un template

### evenements
Dossier contenant tous les travaux faits par l'équipe de devs marketing : portail, article vivre-mieux, page fidélité, BCBU, etc.

### templates
Dossier contenant chaque type de template. Ces dossiers sont à dupliquer lors de la création d'un évènement.

## Utilisation

### Création d'un évènement
Sélectioner le dossier souhaité dans `opeco/templates` et le dupliquer dans `opeco/evenements` puis le renommer du nom de l'EMS.

### Commandes

**Les commandes sont à exécuter dans le dossier de l'évènement utilisé. Par exemple :**
```
opeco/evenements/braderie
```

Le starter dispose de 3 commandes d'initialisation :

1. Lancement du local *desktop*
```
npm run desk
```
Initialise un serveur local à l'adresse http://localhost:8080 avec hot reloading et l'apparence du site _desktop_ de boulanger. Dans ce cas, le traitement est minimal : les ressources (images, script, css, etc.) ne sont pas optimisées.

2. Lancement du local *sim*
```
npm run sim
```
Initialise un serveur local à l'adresse http://localhost:8080 avec hot reloading et l'apparence du site _sim_ de boulanger. Dans ce cas, le traitement est minimal : les ressources (images, script, css, etc.) ne sont pas optimisées.

3. Génération des fichiers pour la prod
```
npm run mep
```
Génère un dossier `dist` contenant tous les fichiers traités, concaténés et optimisés : ce sont les fichiers à mettre **directement sur le FTP**.

### Inclure des fichiers JS et CSS
Pour concaténer des fichiers CSS/JS, il faut ajouter leur chemin dans le fichier suivant : `starter/src/index.js`

**Exemple :**

```js
import bubbleCSS from "bubbles/dist/main.css";
import bubbleAnim from "bubbles/dist/anims.js";
```

Le nom de l'import (*bubbleAnim*) n'est important que dans le cas d'un plugin JS, par exemple :
```js
import Swiper from "swiper/dist/js/swiper.min.js";
[etc.]
new Swiper('.swiper-container', {})
```

### HTML
Le fichier de base est `starter/src/index.html`.

Les includes sont à placer dans le dossier `starter/src/includes` et insérés de cette façon :

```js
${require('./includes/conv1.html')}
```
> **Attention les urls sont relatives donc dans ce ficiher `conv1.html` les images ont comme chemin : `../images/entree_gam.jpg` par exemple.**

> Expliquer le cas avec plusieur HTML + config par évènement

### AJAX
Il est parfois nécessaire de générer des fichiers HTML appelés en Ajax pour être inclus dans une page; pour faire cela, il faut mettre ces fichiers HTML à la racine du dosssier /evenement/[OPECO] et mettre ajouter le préfixe `ajax-` dans le nom du fichier (par exemple : `opeco/evenements/ajax-menu2.html`)

### CSS
Le fichier de base est `starter/src/styles/style.scss`.

### URLs en prod
Pour que les fichiers aient la bonne URL en prod, il faut remplir la variable `stagingPath` tout en haut du fichier `starter/webpack.prod.js`. Par exemple :

```js
const stagingPath = "/content/static/bcom/evenements/2018/07_braderie";
```

### Images (jpg/png)
* Les images sont à placer dans le dossier `starter/src/images`
* Pour appeler une image il faut précéder son chemin d'un `./`. Exemple : `./images/***.jpg`.
* Pour que l'image soit "lazyloadée" il faut ajouter la *class* `lazyload`.

**Exemple :**

```html
<img src="./images/entree_gam.jpg" alt="Illustration gamme produits gros éléctroménager" class="prods__illu lazyload">
```

### SVGs
* Les SVG sont à placer dans le dossier `starter/src/images`
* Pour appeler un SVG il faut précéder son chemin d'un `./`. Exemple :  `./images/***.svg`.
* Un SVG peut être injecté en HTML inline; utile par exemple dans le cas où une animation au survol doit être effectuée.

**Exemple :**

```js
${require('./images/essentielb.svg?inline')}
```

### PurgeCSS
PurgeCSS permet de retirer tout le CSS non utilisé du fichier final. Il se base sur ce qui est présent dans le fichier HTML principal.

> Attention, si une classe est ajoutée en javascript, elle sera retirée par PurgeCSS car elle n'est pas présente dans le DOM brut.
Pour palier à ce problème, 3 solutions :

1. ajouter la classe dans le tableau du fichier `starter/src/loaders/whitelist.js`

2. ajouter une expression régulière au tableau `whitelistPatterns` présent dans le dossier `webpack.prod.js`

3. ajouter `wl-` au debut du nom de la classe (wl = whitelist)
