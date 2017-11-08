(function () {
    'use strict';

    angular
        .module('app.edition')
        .controller('PageCtrl', PageCtrl)

    PageCtrl.$inject = ['editionFactory', '$stateParams', 'ngDialog', 'orderByFilter', '$scope'];

    function PageCtrl(editionFactory, $stateParams, ngDialog, orderBy, $scope) {
        var vm = this;

        vm.itemTypes = editionFactory.itemTypes;
        vm.currentSection = editionFactory.getSection($stateParams.chapterGUID);
        vm.createItem = createItem;
        vm.onUpdate = onUpdate;
        vm.onDelete = onDelete;
        vm.move = move;

        //TODO : à factoriser dans un composant flèches haut/bas + btn suppr
        function move(item, direction) {
            var oldIndex = item.index;
            var newIndex = item.index + direction;
            item.index += direction;
            vm.currentSection.item[newIndex].index = oldIndex;
            vm.currentSection.item = orderBy(vm.currentSection.item, 'index', false);
            $scope.$emit('modelChange');
        }

        function createItem() {
            var dialog = ngDialog.open({
                template: './app/view/edition/popup.html',
                showClose: false,
                controllerAs: 'vm',
                controller: ['$scope', 'types', function ($scope, types) {
                    var vm = this;
                    vm.checkInput = checkInput;
                    vm.types = types;
                    vm.returnObj = {title:'', type:''};

                    function checkInput() {
                        if (!vm.returnObj.title || !vm.returnObj.type) {
                            alert("Toutes les informations n'ont pas été renseignées.");
                            return false;
                        }
                        return true;
                    }
                }],
                resolve: {
                    types: ['editionFactory', function (editionFactory) {
                        return editionFactory.itemTypes;
                    }]
                }
            });

            dialog.closePromise.then(function (data) {
                if (data.value && data.value != 0) {
                    var returnObj = data.value;
                    vm.currentSection.item.push(editionFactory.createItem($stateParams.chapterGUID, returnObj.title, returnObj.type, vm.currentSection.item.length));
                    $scope.$emit('modelChange');
                }
            });
        }

        function onUpdate(obj, prop, value) {
            if(obj[prop].value != value)
            {
                obj[prop].value = value; //won't work if prop is like 'content.text'
                $scope.$emit('tradChange');
            }
        };

        function onDelete(item){
            console.log(item);
            var index = vm.currentSection.item.indexOf(item); //indexOf non compatible avec IE<9
            if (index > -1) {
                vm.currentSection.item.splice(index, 1);
            }

            var indexCount = 0;
            for(var i=0; i<vm.currentSection.item.length; i++)
            {
                var obj = vm.currentSection.item[i];
                obj.index = indexCount;
                indexCount++;
            }

            $scope.$emit('modelChange');
        };
    }

}());