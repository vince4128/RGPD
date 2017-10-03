(function(){ //Fonction immédiatemment invoquée (pour éviter d'avoir des variables globales)

    'use strict';//Pour éviter des variables non déclarées ou d'autres dégueulasserie

    angular
        .module('app.core',[
            /*
            *   Angular module
            */
            'ui.router','ngTouch','ngAnimate','ngSanitize','ui-notification','ngDialog',
            /*
            *   Scorm Wrapper
            */
            'scormwrapper'
        ]);

}());