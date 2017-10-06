(function(){
    'use strict';

    angular
        .module('app.core')
        .factory('dataService', dataService)

    dataService.$inject = ['$http'];

    function dataService($http) {
        var service = {
            getData: getData,
        };

        return service;

        function getData() {
            return [];
        };
    }
})();