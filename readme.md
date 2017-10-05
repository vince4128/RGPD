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

Une fois cela fait utiliser la commande ```javascript npm run dev``` pour que votre projet soit affiché dans un navigateur à l'url "http://localhost:3001"

## Déploiement

Pour déployer tapez la commande ```javascript npm run prod``` et votre projet se compilera dans le dossier "dist" à la racine de votre projet

## Structure

### arborescence de l'app

L'application a un module principale, il s'agit de app (app.module.js)

le sous module app.core (core.module.js) sert à injecter les modules récurrents (ui-router, scormwrapper etc...).

Les modules que vous créez sont à intégrer sous forme de sous module : app.monsousmodule (sousmodule.module.js) et à injecter directement dans le module principal (app)

/!\ N'oubliez pas comme toujours d'ajouter vos fichiers .js dans le fichier index.js

### Créer un module

Pour créer un module, référez vous au module newmodule et reproduisez son arborescence (un dossier pour votre module, les fichiers xxx.module.js, xxx.route.js, xxxController.js), puis référencez votre module dans le module principal ('app').

### Service existant

Ce projet intègre un service du nom de scormService, qui utilise lui même le service scormWrapper du module scormwrapper.

Ce service est injecté dans la phase de run du module principal app.module.js, l'initiation du scorm est réalisé lors de cette phase (run) obeservez la console javascript du navigateur pour vérifier que l'initialisation c'est faite.

Même chose pour la clôture de session scorm, un écouteur d'évènement onbeforeunload est placé dans la phase de run de l'application, celle-ci ce charge de la remontée du scorm à la fermeture de la fenêtre, là encore réferez-vous à la console javascript de votre navigateur pour voir les mesages de débug

Utilisez ensuite les méthodes suivantes :

*scormService.initScorm() pour initialiser le scorm (déjà intégré pas nécessaire de l'utiliser manuellement)
*scormservice.endScorm() pour clôturer le scorm (déjà intégré pas nécessaire de l'utiliser manuellement)
*scormService.existingSuspend() pour récupérer le suspend existant obtenu à l'initialisation du module
*scormService.existingObjSuspend même chose mais au format objet (attention vous devez décommenter la ligne 284 (//existingObjSuspend = getObjSuspend();)) et vous assurez que votre suspend a bien été enregistré avec la syntaxe .json
*scormService.getScormVersion() retourne la version de scorm
*scormService.getSuspend() retourne le suspend
*scormService.sendsuspend() envoie le suspend
*scormService.getObjSuspend() retourne le suspend sous forme d'objet (attention le suspend doit être enregistré avec la syntaxe json dans la bdd)
*scormService.sendObjSuspend() convertit un objet javascript a la syntaxe json et l'enregistre dans la bdd en tant que suspend (attention de bien envoyer un objet)
*scormService.sendSessionTime envoie le temps de la session (automatiquement envoyé lors de la clôture de la session).
*scormService.sendScore() envoie le score
*scormService.sendStatut() envoie le statut


### Expérimental

en console rendez-vous dans le dossier utils et tapez : ```javascript node getFiles``` cela vous retournera les fichiers html, js et img le but à terme étant de les inclures directement dans index.js pour ne pas avoir à le faire à la main

### Utile

Ce projet utilise angularjs-scorm-wrapper pour en svoir plus voilà le lien : https://github.com/patamechanix/angularjs-scorm-wrapper
