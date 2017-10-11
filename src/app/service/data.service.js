(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataService', dataService)

    dataService.$inject = ['$http', 'scormService'];

    function dataService($http, scormService) {
        var service = {
            getData: getData,
            getSection: getSection,
            currentData: []
        };

        return service;

        function getData() {
            return $http.get('data/data.json', { cache: true }).then(function (resp) {
                service.currentData = resp.data.module;
                
                var suspendObj = scormService.existingObjSuspend;
                var isEmpty = angular.equals(suspendObj, {});
                
                for(var i=0; i<service.currentData.section.length; i++){
                    var currentObj = service.currentData.section[i];
                    currentObj.id = String(i);
                    currentObj.read = isEmpty ? suspendObj.section[i].read : false;

                    for(var j=0; j<currentObj.item.length; j++){
                        currentObj.item[j].id = String(j);
                        currentObj.item[j].read = isEmpty ? suspendObj.section[i].item[j].read : false; 
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