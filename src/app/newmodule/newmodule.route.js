(function(){
    'use strict';

    angular
        .module('app.newmodule')
        .config(newmoduleConfig)

    newmoduleConfig.$inject = ['$stateProvider', 'dataService'];

    function newmoduleConfig($stateProvider, dataService) {
        $stateProvider
            .state('newmodule', {
                url:'/newmodule',
                templateUrl:'app/view/newmodule/newmodule.html',
                controller:'NewmoduleCtrl',
                controllerAs:'vm',
                resolve: {
                    //passé en paramètre à NewmoduleCtrl
                    _data: ['dataService', function (dataService) {
                        return dataService.getData();
                    }]
                }
            });
    }

}());