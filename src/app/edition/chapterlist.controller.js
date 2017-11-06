(function () {
    'use strict';

    angular
        .module('app.edition')
        .controller('ChapterCtrl', ChapterCtrl)

    ChapterCtrl.$inject = ['$state'];

    function ChapterCtrl($state) {
        var vm = this;

        vm.gotoPage = gotoPage;

        function gotoPage() {
            $state.go('edition.pages');
        }
    }

}());