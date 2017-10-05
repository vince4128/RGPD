(function () {
    'use strict';

    angular.module('app', [
        //angular modules 
        'app.core',
        //modules développés
        'app.newmodule'
    ])
    .config(configuration)
    .run(runApp);
})();

//configuration
configuration.$inject = ['$urlRouterProvider'];

function configuration($urlRouterProvider){
    $urlRouterProvider.otherwise('/');
};

//run
runApp.$inject = ['$window','scormService'];

function runApp($window, scormService){

    var vm = this;

    scormService.initScorm();

    //on attache un ecouteur d'évènement sur la fermeture de la fenêtre
    $window.onbeforeunload = function(event) {
        event.preventDefault(); //on empêche la fermeture de la fenêtre
        scormService.endScorm(); //LMSFinish va fermer la fenêtre tout seul
    }
    
}