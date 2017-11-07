(function () {
    'use strict';

    angular
        .module('app.edition')
        .controller('PageCtrl', PageCtrl)

    PageCtrl.$inject = ['editionFactory', '$stateParams', 'ngDialog'];

    function PageCtrl(editionFactory, $stateParams, ngDialog) {
        var vm = this;

        vm.itemTypes = editionFactory.itemTypes;
        vm.currentSection = editionFactory.getSection($stateParams.chapterGUID);
        vm.createItem = createItem;

        function createItem() {
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
                        return editionFactory.itemTypes;
                    }]
                }
            });

            dialog.closePromise.then(function (data){
                if(data.value && data.value != 0)
                {
                    var returnObj = data.value;
                    vm.currentSection.item.push(editionFactory.createItem($stateParams.chapterGUID, returnObj.title, returnObj.type));
                }
                //console.log(vm.currentSection.item);
            });
        }

        function onUpdate(obj, prop, value) {
            obj[prop].value = value;
        };
    }

}());