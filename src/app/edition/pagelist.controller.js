(function () {
    'use strict';

    angular
        .module('app.edition')
        .controller('PageCtrl', PageCtrl)

    PageCtrl.$inject = ['editionFactory', '$stateParams'];

    function PageCtrl(editionFactory, $stateParams) {
        var vm = this;

        vm.itemTypes = editionFactory.itemTypes;
        vm.currentSection = editionFactory.getSection($stateParams.chapterGUID);
        vm.createItem = createItem;

        function createItem() {
            vm.currentSection.item.push(editionFactory.createItem(vm.currentSection.item.length, $stateParams.chapterGUID));
        }
    }

}());