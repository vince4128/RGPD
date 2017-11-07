(function () {
    'use strict';

    angular
        .module('app.edition')
        .controller('ChapterCtrl', ChapterCtrl)

    ChapterCtrl.$inject = ['$state', 'editionFactory', 'ngDialog'];

    function ChapterCtrl($state, editionFactory, ngDialog) {
        var vm = this;

        vm.data = editionFactory.translatableData.section;
        vm.sectionTypes = editionFactory.sectionTypes;
        vm.createSection = createSection;
        vm.gotoPage = gotoPage;
        vm.onUpdate = onUpdate;

        function gotoPage(guid) {
            $state.go('edition.pages', { chapterGUID: guid });
        }

        function createSection() {
            var dialog = ngDialog.open({
                template: './app/view/edition/popup.html',
                showClose: false,
                controllerAs: 'vm',
                controller: ['$scope', 'types', function ($scope, types){
                    var vm = this;
                    vm.checkInput = checkInput;
                    vm.types = types;
                    vm.section = {};
                    
                    function checkInput(){
                        var test = false;
                        if (test) {
                            alert('Il manque des informations');
                            return false;
                        }
                        return true;
                    }
                }],
                resolve: {
                    types: ['editionFactory', function (editionFactory) {
                        return editionFactory.sectionTypes;
                    }]
                }
            });

            dialog.closePromise.then(function (data){
                var returnObj = data.value;
                vm.data.push(editionFactory.createSection(returnObj.title, returnObj.type));
                //console.log(vm.data);
            });
        }

        function onUpdate(obj, prop, value) {
            obj[prop].value = value;
        };
    }

}());