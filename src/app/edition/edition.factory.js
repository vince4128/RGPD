
(function () {
    'use strict';

    angular
        .module('app.edition')
        .factory('editionFactory', editionFactory)

    editionFactory.$inject = ['$http', '$translate', 'orderByFilter'];

    function editionFactory($http, $translate, orderBy) {

        var sectionTypes = [];
        sectionTypes.push(new SectionType("course", "Cours"));
        sectionTypes.push(new SectionType("quiz", "Evaluation"));

        var itemTypes = [];
        itemTypes.push(new ItemType("text", "Texte"));
        itemTypes.push(new ItemType("clicktosee", "Cliquer pour lire"));
        itemTypes.push(new ItemType("qsimple", "Question"));
        itemTypes.push(new ItemType("textimg", "Texte et image"));
        itemTypes.push(new ItemType("video", "Film"));

        var factory = {
            getTranslatableData: getTranslatableData,
            setTranslations: setTranslations,
            sectionTypes: sectionTypes,
            itemTypes: itemTypes,
            createSection: createSection,
            createItem: createItem,
            translatableData: [],
            getSection: getSection
        }

        return factory;

        function createSection() {
            var _code = "course_" + guID2(4);// parseInt(index); // length = mauvaise idée en cas de suppression d'une section
            return new Section("course", _code);
        };

        function createItem(sectionCode) {
            var _name = "page_" + guID2(4);//  + parseInt(index); // length = mauvaise idée en cas de suppression d'un item
            return new Item("text", _name, sectionCode);
        };
        
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
                        if (currentObj.item[j].type == 'text') {
                            currentObj.item[j].content.text = new TranslatableText(currentObj.item[j].content.text, $translate.instant(currentObj.item[j].content.text));
                        }
                    }
                }

                return factory.translatableData;
            });
        };

        function setTranslations() {
            var log = getObject(factory.translatableData);
            console.log(log);
        };

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

    function Section(type, code) {
        this.guid = guID2(4);
        this.code = code;
        this.type = type;
        this.title = new TranslatableText(code, null, 'title');
        this.item = [new Item('text', "page_0", code)];
        this.index;
    }

    function Item(type, code, parentCode) {
        this.guid = guID2(4);
        this.code = code;
        this.type = type;
        this.title = new TranslatableText(generateKey(code, [parentCode]), null, 'title');
        this.instruction = new TranslatableText(generateKey(code, [parentCode]), null, 'instruction');
        this.content = createContentObj(type, code, parentCode);
        this.index;
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