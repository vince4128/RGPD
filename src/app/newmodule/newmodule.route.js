(function () {
    'use strict';

    angular
        .module('app.newmodule')
        .config(newmoduleConfig)

    newmoduleConfig.$inject = ['$stateProvider'];

    function newmoduleConfig($stateProvider) {
        $stateProvider
            .state('newmodule', {
                url: '/newmodule',
                templateUrl: 'app/view/newmodule/newmodule.html',
                controller: 'NewmoduleCtrl',
                controllerAs: 'vm',
                resolve: {
                    //passé en paramètre à NewmoduleCtrl
                    _data: ['dataService', function (dataService) {
                        return dataService.getData(true);
                    }]
                }
            })
            .state('newmodule.section', {
                url: '/{sectionId}',
                params: {
                    itemId: 0,
                  },
                templateUrl: 'app/view/newmodule/section.html',
                controller: 'SectionCtrl',
                controllerAs: 'vm',
                resolve: {
                    _section: ['dataService', '$stateParams', function (dataService, $stateParams) {
                        return dataService.getSection($stateParams.sectionId);
                    }]
                }
            })
            .state('edition', {
                url: '/edit',
                templateUrl: 'app/view/edition/edition.html',
                controller: 'EditionCtrl',
                controllerAs: 'vm',
                resolve: {
                    _data: ['dataService', function (dataService) {
                        return dataService.getTranslatableData();
                    }]
                }
            });
    }

}());