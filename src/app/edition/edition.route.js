(function () {
    'use strict';

    angular
        .module('app.edition')
        .config(editionConfig)

    editionConfig.$inject = ['$stateProvider'];

    function editionConfig($stateProvider) {

        /// Edition du DATA.JSON + Traduction
        $stateProvider
            .state('edition', {
                url: '/edition',
                templateUrl: 'app/view/edition/edition.view.html',
                controller: 'EditionCtrl',
                controllerAs: 'vm',
                resolve: {
                    _data: ['dataService', function (dataService) {
                        return dataService.getTranslatableData();
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
                url: '/pages', //{chapterId}
                templateUrl: 'app/view/edition/edition.pagelist.html',
                controller: 'PageCtrl',
                controllerAs: 'vm',
            });
    }

}());