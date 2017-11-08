(function () {
    'use strict';

    angular
        .module('app.edition')
        .config(editionConfig)

    editionConfig.$inject = ['$stateProvider'];

    function editionConfig($stateProvider) {
        $stateProvider
            .state('edition', {
                url: '/edition',
                templateUrl: 'app/view/edition/edition.view.html',
                controller: 'EditionCtrl',
                controllerAs: 'vm',
                resolve: {
                    _data: ['editionFactory', function (editionFactory) {
                        return editionFactory.getTranslatableData();
                    }]
                }
            });
        $stateProvider
            .state('edition.module', {
                url: '/moduleset',
                templateUrl: 'app/view/edition/edition.module.html',
                controller: 'ModuleCtrl',
                controllerAs: 'vm',
            });
        $stateProvider
            .state('edition.chapterlist', {
                url: '/chapters',
                templateUrl: 'app/view/edition/edition.chapterlist.html',
                controller: 'ChapterCtrl',
                controllerAs: 'vm',
            });
        $stateProvider
            .state('edition.pages', {
                url: '/{chapterGUID}',
                templateUrl: 'app/view/edition/edition.pagelist.html',
                controller: 'PageCtrl',
                controllerAs: 'vm',
            });
    }

}());