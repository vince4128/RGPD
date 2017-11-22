
(function () {
    'use strict';

    angular
        .module('app.edition')
        .factory('editionFactory', editionFactory)

    editionFactory.$inject = ['$http', '$translate', 'orderByFilter', 'localeService'];

    function editionFactory($http, $translate, orderBy, localeService) {

        var sectionTypes = [];
        sectionTypes.push(new SectionType("course", "Cours"));
        sectionTypes.push(new SectionType("quiz", "Evaluation"));

        var itemTypes = [];
        itemTypes.push(new ItemType("text", "Texte"));
        itemTypes.push(new ItemType("clicktosee", "Cliquer pour lire"));
        itemTypes.push(new ItemType("qsimple", "Question"));
        itemTypes.push(new ItemType("textimg", "Texte et image"));
        itemTypes.push(new ItemType("video", "Film"));
        itemTypes.push(new ItemType("didacticiel", "Tutoriel"));
        itemTypes.push(new ItemType("orderlist", "Remettre les éléments dans l'ordre"));

        var factory = {
            getTranslatableData: getTranslatableData,
            setTranslations: setTranslations,
            setData:setData,
            sectionTypes: sectionTypes,
            itemTypes: itemTypes,
            createSection: createSection,
            createItem: createItem,
            translatableData: [],
            getSection: getSection
        }

        return factory;

        function createSection(title, type, index) {
            var _code = type == 'course' ? "course_" : "quiz_";
            _code += guID2(4);
            return new Section(type, _code, title, index);
        };

        function createItem(sectionCode, title, type, index) {
            var _code = "page_" + guID2(4);
            if (!type) {
                type = "text";
            }
            return new Item(type, _code, sectionCode, index);
        };

        ///////////////////

        function getSection(guid) {
            function sectionMatchesParam(section) {
                return section.guid === guid;
            }
            return factory.translatableData.section.find(sectionMatchesParam);
        };

        function getTranslatableData() {
            return $http.get('data/data.json', { cache: true }).then(function (resp) {
                factory.translatableData = resp.data.module;

                //////// SORT BY INDEX

                factory.translatableData.section = orderBy(factory.translatableData.section, 'index', false);
                for (var i = 0; i < factory.translatableData.section.length; i++) {
                    factory.translatableData.section[i].item = orderBy(factory.translatableData.section[i].item, 'index');
                }

                ////////

                var _header = factory.translatableData.header;
                _header.title = new TranslatableText(_header.title, $translate.instant(_header.title));
                _header.description = new TranslatableText(_header.description, $translate.instant(_header.description));

                for (var i = 0; i < factory.translatableData.section.length; i++) {
                    var currentObj = factory.translatableData.section[i];
                    currentObj.id = String(i);
                    currentObj.title = new TranslatableText(currentObj.title, $translate.instant(currentObj.title));

                    for (var j = 0; j < currentObj.item.length; j++) {
                        currentObj.item[j].id = String(j);
                        currentObj.item[j].title = new TranslatableText(currentObj.item[j].title, $translate.instant(currentObj.item[j].title));
                        currentObj.item[j].instruction = new TranslatableText(currentObj.item[j].instruction, $translate.instant(currentObj.item[j].instruction));
                        if (currentObj.item[j].type == 'text' || currentObj.item[j].type == 'textimg') {
                            currentObj.item[j].content.text = new TranslatableText(currentObj.item[j].content.text, $translate.instant(currentObj.item[j].content.text));
                        }
                    }
                }

                return factory.translatableData;
            });
        };

        /** 
         * Génère le fichier de traduction de base
         * - lang: code langue du fichier de trad dans lequel le module est rédigé.
         **/
        function setTranslations(lang, country) {
            //TODO: objet à écrire dans {lang}.json -> appel fonction PHP ou fileSaver
            var log = getObject(factory.translatableData);
            
            //envoyer les données à traiter par php
            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }

            country = localeService.getCurrentLocale();

            $http.post('save.php',{type:'lang', data : angular.toJson(log), lang:country}, config)
                .then(
                    function(response){
                        alert('requete passee ' + response);
                    },
                    function(response){
                        alert('requete echouée ' + response);
                    }
                );

            return log;

        };

        /** 
         * Génère le fichier data.json sans les objets de trad 
         * - newData : objet modifié par le user dans la GUI
         */
        function setData(newData) {

            //TODO: objet à écrire dans data.json et/ou BDD -> appel fonction PHP
            var result = angular.copy(newData);

            var _header = result.header;
            _header.title = _header.title.key;
            _header.description = _header.description.key;

            for (var i = 0; i < result.section.length; i++) {
                var currentObj = result.section[i];
                currentObj.title = currentObj.title.key;

                for (var j = 0; j < currentObj.item.length; j++) {
                    currentObj.item[j].title = currentObj.item[j].title.key;
                    currentObj.item[j].instruction = currentObj.item[j].instruction.key;
                    if (currentObj.item[j].type == 'text' || currentObj.item[j].type == 'textimg') {
                        currentObj.item[j].content.text = currentObj.item[j].content.text.key;
                    }
                }
            }

            //envoyer les données à traiter par php
            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }

            var dataString = "{\"module\":"+angular.toJson(result)+"}";

            $http.post('save.php',{type:'data', data : dataString}, config)
                .then(
                    function(response){
                        alert('requete passee ' + response);
                    },
                    function(response){
                        alert('requete echouée ' + response);
                    }
                );

            return result;
        }

        //////

        function getObject(theObject) {
            var result = [];
            if (theObject instanceof Array) {
                for (var i = 0; i < theObject.length; i++) {
                    result.push(getObject(theObject[i]));
                }
            }
            else {
                for (var prop in theObject) {
                    if (prop == 'key') {
                        var key = theObject['key'];
                        var newObj = { [key]: theObject['value'] };
                        result.push(newObj);
                    }
                    if (theObject[prop] instanceof Object || theObject[prop] instanceof Array) {
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
                    }
                } else {
                    toReturn[i] = ob[i];
                }
            }
            return toReturn;
        };
    }

    function TranslatableText(key, value, propertyName) {
        this.key = propertyName ? key + '.' + propertyName : key;
        this.value = value ? value : 'A renseigner';
    }

    ////

    function SectionType(code, description) {
        this.code = code;
        this.description = description;
    }

    function ItemType(code, description) {
        this.code = code;
        this.description = description;
    }

    function Section(type, code, title, index) {
        this.guid = guID2(4);
        this.code = code;
        this.type = type;
        this.title = new TranslatableText(code, title, 'title');
        this.item = [new Item('text', "page_0", code)];
        this.index = index;
    }

    function Item(type, code, parentCode, index) {
        this.guid = guID2(4);
        this.code = code;
        this.type = type;
        this.title = new TranslatableText(generateKey(code, [parentCode]), null, 'title');
        this.instruction = new TranslatableText(generateKey(code, [parentCode]), null, 'instruction');
        this.content = createContentObj(type, code, parentCode);
        this.index = index;
    }

    function ClickableItem(code, parentCode, rootCode) {
        this.code = code;
        this.text = new TranslatableText(generateKey(code, [rootCode, parentCode]), null, 'text');
        this.img = "";
    }

    function createContentObj(type, parentCode, rootCode) {
        switch (type) {
            case 'text':
                return { "text": new TranslatableText(generateKey('item_0', [rootCode, parentCode]), null, 'content') };

            case 'textimg':
                return { "text": new TranslatableText(generateKey('item_0', [rootCode, parentCode]), null, 'content'), "img": rootCode + '.' + parentCode + '.content' };

            case 'clicktosee':
                return { clickableitem: [new ClickableItem('item_0', parentCode, rootCode)] };
        }
    }

    /** Génère une clé de trad */
    function generateKey(code, parentCodeArr) {
        var result = '';
        if (parentCodeArr) {
            var tempArr = [];
            angular.copy(parentCodeArr, tempArr);
            while (tempArr[0]) {
                result += tempArr.shift() + '.';
            }
        }
        result += code;
        return result;
    }

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
})();