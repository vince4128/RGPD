(function(){
    'use strict';
    angular
        .module('app.core', [
            /*
            *   Angular module
            */
            'ui.router','ngTouch','ngAnimate','ngSanitize','ui-notification','ngDialog','pascalprecht.translate','underscore',
            /*
            *   Scorm Wrapper
            */
            'scormwrapper'
        ]);
        
}());