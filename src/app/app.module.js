(function () {
    'use strict';

    angular.module('app', [
        //angular modules 
        'app.core',
        //modules développés
        'app.component',
        'app.directive',
        'app.home',
        'app.edition',
        'app.layout'
    ])
        .config(configuration)
        .run(runApp);
})();

//configuration
configuration.$inject = ['$urlRouterProvider'];

function configuration($urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
};

//run
runApp.$inject = ['$window', 'scormService', '$rootScope'];

function runApp($window, scormService, $rootScope) {

    var vm = this;

    //booléen pour s'assurer de ne revenir sur la page du location, qu'une seule fois
    $rootScope.locationRead = false;

    //booléen indiquant si l'on revient au menu à la fin d'une section, ou si l'on passe à la suite
    $rootScope.returnToHomeAtSectionEnd = true;

    scormService.initScorm();

    //on attache un ecouteur d'évènement sur la fermeture de la fenêtre
    $window.onbeforeunload = function(event) {
        event.preventDefault(); //on empêche la fermeture de la fenêtre
        scormService.endScorm(); //LMSFinish va fermer la fenêtre tout seul
    }
    
}