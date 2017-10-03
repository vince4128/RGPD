# Master of module

Projet de moteur de module utilisant Angular

## Getting Started

Les instructions suivantes ont pour but de détailler les étapes pour créer un nouveau projet utilisant ce moteur

### Prérequis 

Avoir une version récente de node.js installée sur sa machine, savoir lancer des lignes de commande npm depuis une console

### Installation

Récupérer ce dossier, et le copier/coller dans votre dossier de travail.

vous pouvez également le cloner à l'aide de github.

rendez-vous ensuite à la racine de ce dossier à l'aide d'un terminal (console).

tapez la commande ```javascript npm install```

toutes les dépendances s'installent !

Une fois cela fait utiliser la commande ```javascriptnpm run dev``` pour que votre projet soit affiché dans un navigateur à l'url "http://localhost:3001"

## Déploiement

Pour déployer tapez la commande ```javascript npm run prod``` et votre projet se compilera dans le dossier "dist" à la racine de votre projet

### Expérimental

en console rendez-vous dans le dossier utils et tapez : ```javascript node getFiles``` cela vous retournera les fichiers html, js et img le but à terme étant de les inclures directement dans index.js pour ne pas avoir à le faire à la main

### Utile

Ce projet utilise angularjs-scorm-wrapper pour en svoir plus voilà le lien : https://github.com/patamechanix/angularjs-scorm-wrapper