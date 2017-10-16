(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataService', dataService)

    dataService.$inject = ['$http', 'scormService', '$translate'];

    function dataService($http, scormService, $translate) {
        var service = {
            getData: getData,
            getSection: getSection,
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
                
                for(var i=0; i<service.currentData.section.length; i++){
                    var currentObj = service.currentData.section[i];
                    currentObj.id = String(i);
                    for(var j=0; j<currentObj.item.length; j++){
                        currentObj.item[j].id = String(j);
                    }
                }

                if(_doMapSuspend)
                {
                    mapSuspendData();
                }

                return service.currentData;
            });
        };

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
                    //console.log(prop + ': ' + theObject[prop]);
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
                        
                        toReturn[i + '.' + x] = flatObject[x];
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

        function mapSuspendData(){
            var suspendObj = scormService.getSuspend();
            var isEmpty = angular.equals(suspendObj, {});
            
            for(var i=0; i<service.currentData.section.length; i++){
                var currentObj = service.currentData.section[i];
                currentObj.read = isEmpty ? false : suspendObj.section[i].read; //workaround : cette propriété est-elle nécessaire, ne pourrait-on pas se contenter du suspend ?

                for(var j=0; j<currentObj.item.length; j++){
                    currentObj.item[j].read = isEmpty ? false : suspendObj.section[i].item[j].read; 
                }
            }
            
            //si vide, on initialise l'objet suspend avec les données du module
            if(isEmpty)
            {
                scormService.existingSuspend = scormService.createSuspend(service.currentData);
            }
        };

    }

    function TranslatableText(key, value){
        this.key = key;
        this.value = value; 
    }
})();