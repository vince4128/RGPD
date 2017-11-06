(function () {
    'use strict';

    angular
        .module('app.edition')
        .controller('ChapterCtrl', ChapterCtrl)

    ChapterCtrl.$inject = ['$state', 'editionFactory'];

    function ChapterCtrl($state, editionFactory) {
        var vm = this;

        vm.data = editionFactory.translatableData.section;
        vm.sectionTypes = editionFactory.sectionTypes;
        vm.createSection = createSection;
        vm.gotoPage = gotoPage;

        activate();

        function activate(){
            console.log(vm.sectionTypes);
        }

        function gotoPage(guid) {
            $state.go('edition.pages', {chapterGUID: guid});
        }
        
        function createSection() {
            vm.data.push(editionFactory.createSection(vm.data.length));
        }
    }

}());