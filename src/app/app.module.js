(function () {
    'use strict';

    angular.module('app', [
        //angular modules 
        'app.core',
        //modules développés
        'app.newmodule'
    ])
    .config(configuration);
})();

configuration.$inject = ['$urlRouterProvider'];

function configuration($urlRouterProvider){
    $urlRouterProvider.otherwise('/');
};