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

    didacticielController.$inject = ['$scope', '$rootScope'];

    function didacticielController($scope, $rootScope) {

        var ctrl = this;
        ////////////////

        ctrl.currentItem = 0;
        ctrl.checkReadEvent = checkReadEvent;
        ctrl.test = test;
        ctrl.close = close;

        /////////////////////////////////////

        function checkReadEvent() {
            var allSeen = false;
            for (var i = 0; i < ctrl.item.content.pointers.length; i++) {
                if (!ctrl.item.content.pointers[i].seen) {
                    return;
                } else {
                    allSeen = true;
                }
            }
            if (allSeen) {
                $scope.$emit('readevent', true);
            }
        }

        function test(){
            $scope.$emit('ngDropover.open', 'myDropover0');
        }

        function close(index){
            var currentDropover = 'myDropover'+index;
            $rootScope.$emit('ngDropover.close', currentDropover);
            ctrl.currentItem = parseInt(index)+1;
            console.log(ctrl.currentItem);
        }
        
        ctrl.$doCheck = function () {
            $scope.$emit('ngDropover.open', 'myDropover0');

            console.log('prout', angular.element(document.querySelector('#myDropover0')))
        };

    }

})();