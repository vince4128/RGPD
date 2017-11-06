(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataService', dataService)

    dataService.$inject = ['$http', 'scormService', 'orderByFilter'];

    function dataService($http, scormService, orderBy, $translate) {
        var service = {
            getData: getData,
            getSection: getSection,
            getSuspendValue: getSuspendValue,
            setSuspendValue: setSuspendValue,
            currentData: []
        };

        return service;

        //_doMapSuspend : booléen indiquant s'il faut ajouter les propriétés issues du suspend
        function getData(_doMapSuspend) {
            return $http.get('data/data.json', { cache: true }).then(function (resp) {
                service.currentData = resp.data.module;

                //////// SORT BY INDEX

                service.currentData.section = orderBy(service.currentData.section, 'index', false);

                for (var i = 0; i < service.currentData.section.length; i++) {
                    service.currentData.section[i].item = orderBy(service.currentData.section[i].item, 'index');
                }

                ///////

                var suspendObj = scormService.getSuspend(); //[{uid:"1", read:'1'}, {uid:"2",read:'1'}, ...]
                var isEmpty = angular.equals(suspendObj, []);

                var qId = 0;
                var uid = 0;
                var count = 1;

                for (var i = 0; i < service.currentData.section.length; i++) {
                    var currentObj = service.currentData.section[i];
                    currentObj.id = String(i);
                    currentObj.uid = String(uid);
                    currentObj.read = isEmpty ? false : getSuspendValue(suspendObj, uid, 'read');

                    if (isEmpty) {
                        var sectionObj = { uid: String(uid), read: false };
                        suspendObj.push(sectionObj);
                    }

                    uid++;

                    for (var j = 0; j < currentObj.item.length; j++) {
                        currentObj.item[j].id = String(j);
                        currentObj.item[j].uid = String(uid);
                        currentObj.item[j].page = count;
                        currentObj.item[j].read = isEmpty ? false : getSuspendValue(uid, 'read');
                        //est-ce une interaction qui compte pour la note finale ?
                        if (currentObj.item[j].evaluated) {
                            currentObj.item[j].questionId = qId;
                            currentObj.item[j].answer = isEmpty ? null : getSuspendValue(uid, 'answer');
                            currentObj.item[j].answerValue = isEmpty ? null : getSuspendValue(uid, 'answerValue');
                            qId++;
                        }

                        if (isEmpty) {
                            var itemObj = { uid: String(uid), read: false };
                            suspendObj.push(itemObj);
                        }

                        uid++;
                        count++;
                    }
                }

                //si vide, on initialise l'objet suspend avec les données du module
                if (isEmpty) {
                    scormService.existingSuspend = scormService.createSuspend(service.currentData);
                }

                return service.currentData;
            });
        };

        function getSuspendValue(key, value) {
            var obj = scormService.existingSuspend;
            for (var i = 0; i < obj.length; i++) {
                if (obj[i].uid === key) {
                    switch(value)
                    {
                        case 'read':
                        return !!parseInt(obj[i].read);

                        case 'answer':
                        return parseInt(obj[i].answer);

                        case 'answerValue':
                        return !!parseInt(obj[i].answerValue);

                        default:
                        return false;
                    }
                }
            }
            return null;
        };

        function setSuspendValue(key, value) {
            var obj = scormService.existingSuspend;
            for (var i = 0; i < obj.length; i++) {
                if (obj[i].uid == key) {
                    //si value est un objet ( à recoder si on décide d'envoyer plus d'infos avec read )
                    if (angular.isObject(value)) {
                        obj[i].answerValue = value.value;
                        obj[i].answer = value.answer;
                    }
                    else {
                        obj[i].read = value;
                    }
                    break;
                }
            }
        }

        function getSection(id) {
            function sectionMatchesParam(section) {
                return section.id === id;
            }
            return service.currentData.section.find(sectionMatchesParam);
        };
    }
})();