(function () {
    'use strict';

    angular
        .module('app.edition')
        .controller('ChapterCtrl', ChapterCtrl)

    ChapterCtrl.$inject = ['$state', 'editionFactory', 'ngDialog', 'orderByFilter'];

    function ChapterCtrl($state, editionFactory, ngDialog, orderBy) {
        var vm = this;

        vm.data = editionFactory.translatableData.section;
        vm.sectionTypes = editionFactory.sectionTypes;
        vm.createSection = createSection;
        vm.gotoPage = gotoPage;
        vm.onUpdate = onUpdate;
        vm.onDelete = onDelete;
        vm.move = move;

        //TODO : à factoriser dans un composant flèches haut/bas + btn suppr
        function move(section, direction){
            var oldIndex = section.index; console.log(oldIndex);
            var newIndex = section.index + direction; console.log(newIndex);
            section.index += direction;
            vm.data[newIndex].index = oldIndex;
            vm.data = orderBy(vm.data, 'index', false);
        };

        function gotoPage(guid) {
            $state.go('edition.pages', { chapterGUID: guid });
        };

        function createSection() {
            var dialog = ngDialog.open({
                template: './app/view/edition/popup.html',
                showClose: false,
                controllerAs: 'vm',
                controller: ['$scope', 'types', function ($scope, types) {
                    var vm = this;
                    vm.checkInput = checkInput;
                    vm.types = types;
                    vm.returnObj = {};

                    function checkInput() {
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

            dialog.closePromise.then(function (data) {
                if (data.value && data.value != 0) {
                    var returnObj = data.value;
                    vm.data.push(editionFactory.createSection(returnObj.title, returnObj.type, vm.data.length));
                }
            });
        };

        function onUpdate(obj, prop, value) {
            obj[prop].value = value;
        };

        function onDelete(section){
            console.log('on delete');
            var index = vm.data.indexOf(section); //indexOf non compatible avec IE<9
            if (index > -1) {
                vm.data.splice(index, 1);
            }

            var indexCount = 0;
            for(var i=0; i<vm.data.length; i++)
            {
                var obj = vm.data[i];
                obj.index = indexCount;
                indexCount++;
            }
        };
    }

}());