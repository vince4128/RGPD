(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataService', dataService)

    dataService.$inject = ['$http'];

    function dataService($http) {
        var service = {
            getData: getData,
            getSection: getSection
        };

        return service;

        function getData() {
<<<<<<< HEAD
            return $http.get('data/data.json', { cache: true }).then(function (resp) {
                return resp.data.module;
            });
        };

        function getSection(id) {
            function sectionMatchesParam(section) {
                return section.id === id;
            }

            return service.getData().then(function (data) {
                return data.section.find(sectionMatchesParam);
            });
        };

=======
            return [];
        };
>>>>>>> Internationalization
    }
})();