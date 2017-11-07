(function () {
    'use strict';

    angular
        .module('app.component')
        .component('didacticiel', {
            bindings: {
                item: '<'
            },
            templateUrl: './app/template/didacticiel/didacticiel.html',
            controller: didacticielController
        });

    didacticielController.$inject = ['$scope'];

    function didacticielController($scope) {

        var ctrl = this;
        ////////////////

        ctrl.currentItem = null;
        ctrl.checkReadEvent = checkReadEvent;
        /////////////////////////////////////

        function checkReadEvent(){
            var allSeen = false;
            for(var i=0; i<ctrl.item.content.pointers.length;i++){
                if(!ctrl.item.content.pointers[i].seen){
                    return;
                }else{
                    allSeen = true;
                }
            }
            if(allSeen){
                $scope.$emit('readevent',true);
            }
        }

        ctrl.$onInit = function () {
            //ici nous avons accès aux valeurs de nos bindings
        };

    }

})();