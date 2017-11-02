(function () {
    'use strict';

    angular
        .module('app.edition')
        .controller('EditionCtrl', EditionCtrl)

    EditionCtrl.$inject = ['_data', 'dataService'];

    function EditionCtrl(_data, dataService) {
        var vm = this;

        /**
         * TODO :
         * - on ne choisit le type d'une section ou d'un item que quand on le crée.
         * - générer un code à la création
         * - supprimer ou déplacer des items/sections
         * - mapper sur la trad
         *      - générer la référence de trad automatiquement ( section.code + item.code + propertyName + [item.code] + propertyName )
         * - raffraîchir la vue item quand on clique sur une nouvelle section ( créer une sous-vue ? )
         */

        // données récupérées du resolve dans le state
        vm.data = _data;

        vm.currentSection;
        vm.currentItem;
        vm.createSection = createSection;
        vm.createItem = createItem;
        vm.onChange = onChange;
        vm.test = test;

        vm.sectiontypes = [];
        vm.sectiontypes.push(new SectionType("course", "Cours"));
        vm.sectiontypes.push(new SectionType("quiz", "Evaluation"));

        vm.itemtypes = [];
        vm.itemtypes.push(new ItemType("text", "Texte"));
        vm.itemtypes.push(new ItemType("clicktosee", "Cliquer pour lire"));
        vm.itemtypes.push(new ItemType("qsimple", "Question"));
        vm.itemtypes.push(new ItemType("textimg", "Texte et image"));

        activate();

        function activate() {
            //console.log(vm.data);
        }

        function onChange() {
            //console.log(vm.data.header);
        }

        function createSection() {
            var _code = "course_" + parseInt(vm.data.section.length); // length = mauvaise idée en cas de suppression d'une section
            vm.data.section.push(new Section("course", _code));
            //console.log(vm.data);
        }

        function createItem() {
            var _name = "page_" + parseInt(vm.currentSection.item.length); // length = mauvaise idée en cas de suppression d'un item
            vm.currentSection.item.push(new Item("text", _name, vm.currentSection.code));
            //console.log(vm.data);
        }

        function test(data) {
            dataService.setTranslations();
        }
    }

    function SectionType(code, description) {
        this.code = code;
        this.description = description;
    }

    function ItemType(code, description) {
        this.code = code;
        this.description = description;
    }

    function Section(type, code) {
        this.code = code;
        this.type = type;
        this.title = new TranslatableText(code, 'title');
        this.item = [new Item('text', "page_0", code)];
    }

    function Item(type, code, parentCode) {
        this.code = code;
        this.type = type;
        this.title = new TranslatableText(generateKey(code, [parentCode]), 'title');
        this.instruction = new TranslatableText(generateKey(code, [parentCode]), 'instruction');
        this.content = createContentObj(type, code, parentCode);
    }

    function ClickableItem(code, parentCode, rootCode) {
        this.code = code;
        this.text = new TranslatableText(generateKey(code, [rootCode, parentCode]), 'text');
        this.img = "";
    }

    function TranslatableText(key, propertyName) {
        this.key = key + '.' + propertyName;
        this.value = 'A renseigner';
    }

    function createContentObj(type, parentCode, rootCode) {
        switch (type) {
            case 'text':
                return { "text": new TranslatableText(generateKey('item_0', [rootCode, parentCode]), 'content') };

            case 'textimg':
                return { "text": new TranslatableText(generateKey('item_0', [rootCode, parentCode]), 'content'), "img": rootCode + '.' + parentCode + '.content' };

            case 'clicktosee':
                return { clickableitem: [new ClickableItem('item_0', parentCode, rootCode)] };
        }
    }

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
})();