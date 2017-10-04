(function(){
    'use strict';

    angular
        .module('app.newmodule')
        .config(newmoduleConfig)

    newmoduleConfig.$inject = ['$stateProvider'];

    function newmoduleConfig($stateProvider) {
        $stateProvider
            .state('newmodule', {
                url:'/newmodule',
                templateUrl:'app/view/newmodule/newmodule.html',
                controller:'NewmoduleCtrl',
                controllerAs:'vm'
            });
    }

}());