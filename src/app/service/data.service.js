(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataService', dataService)

    dataService.$inject = ['$http', 'scormService', 'orderByFilter', '$translate'];

    function dataService($http, scormService, orderBy, $translate) {
        var service = {
            getData: getData,
            getSection: getSection,
            getSuspendValue: getSuspendValue,
            setSuspendValue: setSuspendValue,
            getTranslatableData: getTranslatableData,
            setTranslations : setTranslations,
            currentData: [],
            translatableData : []
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

        function getTranslatableData(){
            return $http.get('data/data.json', { cache: true }).then(function (resp) {
                service.translatableData = resp.data.module;

                var _header = service.translatableData.header;
                _header.title = new TranslatableText(_header.title, $translate.instant(_header.title));
                _header.description = new TranslatableText(_header.description, $translate.instant(_header.description));
                
                for(var i=0; i<service.translatableData.section.length; i++){
                    var currentObj = service.translatableData.section[i];
                    currentObj.id = String(i);
                    currentObj.title = new TranslatableText(currentObj.title, $translate.instant(currentObj.title));
                    
                    for(var j=0; j<currentObj.item.length; j++){
                        currentObj.item[j].id = String(j);
                        currentObj.item[j].title = new TranslatableText(currentObj.item[j].title, $translate.instant(currentObj.item[j].title));
                        currentObj.item[j].instruction = new TranslatableText(currentObj.item[j].instruction, $translate.instant(currentObj.item[j].instruction));
                        if(currentObj.item[j].type == 'text')
                        {
                            currentObj.item[j].content.text = new TranslatableText(currentObj.item[j].content.text, $translate.instant(currentObj.item[j].content.text));
                        }
                    }
                }

                return service.translatableData;
            });
        }

        function setTranslations()
        {
            var log = getObject(service.translatableData);
            console.log(log);
        }

        function getObject(theObject) {
            var result = [];
            if(theObject instanceof Array) {
                for(var i = 0; i < theObject.length; i++) {
                    result.push(getObject(theObject[i]));
                }
            }
            else
            {
                for(var prop in theObject) {
                    if(prop == 'key') {
                        var key = theObject['key'];
                        var newObj = { [key]:theObject['value'] };
                        result.push(newObj);
                    }
                    if(theObject[prop] instanceof Object || theObject[prop] instanceof Array) {
                        result.push(getObject(theObject[prop]));
                    }
                }
            }
            return flattenObject(result);
        };

        function flattenObject(ob) {
            var toReturn = {};
            
            for (var i in ob) {
                if (!ob.hasOwnProperty(i)) continue;
                
                if ((typeof ob[i]) == 'object') {
                    var flatObject = flattenObject(ob[i]);
                    for (var x in flatObject) {
                        if (!flatObject.hasOwnProperty(x)) continue;
                        toReturn[x] = flatObject[x];
                        //toReturn[i + '.' + x] = flatObject[x];
                    }
                } else {
                    toReturn[i] = ob[i];
                }
            }
            return toReturn;
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
        function guID2(len) {
            var id = '';
            while (len--) {
                id += String.fromCharCode((id = Math.random() * 62 | 0, id += id > 9 ? (id < 36 ? 55 : 61) : 48));
            }
            return id;
        }
    }

    function TranslatableText(key, value){
        this.key = key;
        this.value = value; 
    }
})();