(function () {
    'use strict';

    angular
        .module('app.newmodule')
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
            console.log(vm.data);
        }

        function onChange(){
            console.log(vm.data.header);
        }

        function createSection() {
            var _name = "course_" + parseInt(vm.data.section.length); // length = mauvaise idée en cas de suppression d'une section
            vm.data.section.push(new Section(_name, "course"));
            console.log(vm.data);
        }

        function createItem() {
            var _name = "page_" + parseInt(vm.currentSection.item.length); // length = mauvaise idée en cas de suppression d'un item
            vm.currentSection.item.push(new Item(_name, "text"));
            console.log(vm.data);
        }

        function test(data){
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

    function Section(code, type) {
        this.code = code;
        this.title = "";
        this.type = type;
        this.item = [new Item("page_0", 'text')];
    }

    function Item(code, type) {
        this.code = code;
        this.title = "";
        this.type = type;
        this.content = createItemContent(type);
    }

    function ClickableItem(code) {
        this.code = code;
        this.text = "";
        this.img = "";
    }

    function TranslatableText(){
        this.key; //module.title
        this.value; //Bonjour
    }

    function createItemContent(type) {
        switch (type) {
            case 'text':
                return { "text": '' };

            case 'textimg':
                return { "text": '', "img": '' };

            case 'clicktosee':
                return {clickableitem:[new ClickableItem('item_0')]};
        }
    }
})();