(function () {
    'use strict';

    angular
        .module('app.newmodule')
        .controller('EditionCtrl', EditionCtrl)

    EditionCtrl.$inject = ['_data'];

    function EditionCtrl(_data) {
        var vm = this;

        /**
         * TODO :
         * - on ne choisit le type d'une section ou d'un item que quand on le crée.
         * - supprimer ou déplacer des items/sections
         * - mapper sur la trad
         */

        // données récupérées du resolve dans le state
        vm.data = _data;

        vm.currentSection;
        vm.currentItem;
        vm.createSection = createSection;
        vm.createItem = createItem;

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

        }

        function createSection() {
            var _name = "course_" + parseInt(vm.data.section.length + 1);
            vm.data.section.push(new Section(_name, "course"));
            console.log(vm.data);
        }

        function createItem() {
            var _name = "page_" + parseInt(vm.currentSection.item.length + 1);
            vm.currentSection.item.push(new Item(_name, "text"));
            console.log(vm.data);
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
        this.item = [new Item("page_0"), 'text'];
    }

    function Item(code, type) {
        this.code = code;
        this.title = "";
        this.type = type;
        this.content = {};
    }
})();