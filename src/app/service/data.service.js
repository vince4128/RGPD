(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataService', dataService)

    dataService.$inject = ['$http', 'scormService', 'orderByFilter'];

    function dataService($http, scormService, orderBy) {
        var service = {
            getData: getData,
            getSection: getSection,
            currentData: []
        };

        return service;

        function getData() {
            return $http.get('data/data.json', { cache: true }).then(function (resp) {
                service.currentData = resp.data.module;

                //////// SORT BY INDEX

                service.currentData.section = orderBy(service.currentData.section, 'index', false);
                
                for(var i=0;i<service.currentData.section.length;i++){
                    service.currentData.section[i].item = orderBy(service.currentData.section[i].item,'index');
                }

                ///////
                
                var suspendObj = scormService.getSuspend();
                var isEmpty = angular.equals(suspendObj, {});

                var qId = 0;
                var uid = 0;
                var count = 1;

                for(var i=0; i<service.currentData.section.length; i++){
                    var currentObj = service.currentData.section[i];
                    currentObj.id = String(i); 
                    currentObj.uid = String(uid);
                    currentObj.read = isEmpty ? false : suspendObj.section[i].read;
                    uid++;

                    for(var j=0; j<currentObj.item.length; j++){
                        currentObj.item[j].id = String(j);
                        currentObj.item[j].uid = String(uid);
                        currentObj.item[j].page = count;
                        currentObj.item[j].read = isEmpty ? false : suspendObj.section[i].item[j].read;
                        //est-ce une interaction qui compte pour la note finale ?
                        if(currentObj.item[j].evaluated){
                            currentObj.item[j].questionId = qId;
                            qId++;
                        }
                        uid++;
                        count++;
                    }
                }
                
                //si vide, on initialise l'objet suspend avec les données du module
                if(isEmpty)
                {
                    scormService.existingSuspend = scormService.createSuspend(service.currentData);
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

        /**
         * Génération d'identifiant unique
         * @param {*} len 
         */
        function guID2 (len) {
            var id = '';
            while( len-- ) {
                id += String.fromCharCode(( id = Math.random() * 62 | 0, id += id > 9 ? ( id < 36 ? 55 : 61 ) : 48 ));
            }
            return id;
        }

    }
})();