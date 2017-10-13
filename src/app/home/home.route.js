(function () {
    'use strict';

    angular
        .module('app.home')
        .config(homeConfig)

    homeConfig.$inject = ['$stateProvider'];

    function homeConfig($stateProvider) {
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'app/view/home/home.html',
                controller: 'homeCtrl',
                controllerAs: 'vm',
                resolve: {
                    //passé en paramètre à homeCtrl
                    _data: ['dataService', function (dataService) {
                        return dataService.getData();
                    }]
                }
            });
        $stateProvider
            .state('home.section', {
                url: '/{sectionId}',
                params: {
                    itemId: 0,
                  },
                templateUrl: 'app/view/home/section.html',
                controller: 'SectionCtrl',
                controllerAs: 'vm',
                resolve: {
                    _section: ['dataService', '$stateParams', function (dataService, $stateParams) {
                        return dataService.getSection($stateParams.sectionId);
                    }]
                }
            });
    }

}());