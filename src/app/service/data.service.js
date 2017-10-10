(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataService', dataService)

    dataService.$inject = ['$http'];

    function dataService($http) {
        var service = {
            getData: getData,
            getSection: getSection,
            currentData: []
        };

        return service;

        function getData() {
            return $http.get('data/data.json', { cache: true }).then(function (resp) {
                service.currentData = resp.data.module;
                for(var i=0; i<service.currentData.section.length; i++){
                    
                    var currentObj = service.currentData.section[i];
                    currentObj["id"] = String(i);
                    currentObj["read"] = false; //TODO: raccrocher les wagons avec le location

                    for(var j=0; j<currentObj.item.length; j++){
                        currentObj.item[j]["id"] = String(j);
                        currentObj.item[j]["read"] = false; //TODO: raccrocher les wagons avec le location
                    }

                }
                return service.currentData;
            });
        };

        function getSection(id) {
            function sectionMatchesParam(section) {
                return section.id === id;
            }
            return service.currentData.section.find(sectionMatchesParam);
        };

    }
})();