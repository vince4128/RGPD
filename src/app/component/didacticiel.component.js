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
        ctrl.close = close;
        ctrl.currentOpened = false;

        /////////////////////////////////////

        function checkReadEvent() {
            var allSeen = false;
            for (var i = 0; i < ctrl.internalItem.content.pointers.length; i++) {
                if (!ctrl.internalItem.content.pointers[i].seen) {
                    return;
                } else {
                    allSeen = true;
                }
            }
            if (allSeen) {
                $scope.$emit('readevent', true);
            }
        }

        function close(index){
            var currentDropover = 'myDropover'+index;
            $rootScope.$emit('ngDropover.close', currentDropover);
        }

        ctrl.$onInit = function (){
            ctrl.internalItem = angular.copy(ctrl.item);
        }
        
        ctrl.$doCheck = function () {
            var currentDropover = 'myDropover'+ctrl.currentItem;
            if(!ctrl.currentOpened) {
                if(!angular.element(document.querySelector('#'+currentDropover)).hasClass('ngdo-open')) {
                    $scope.$emit('ngDropover.open', currentDropover);
                }
                else {
                    ctrl.currentOpened = true;
                }
            }
        };

        $scope.$on('ngDropover.closing', function(event, dropObj) {
            ctrl.currentItem++;
            if(ctrl.currentOpened && ctrl.currentItem >= ctrl.internalItem.content.pointers.length) {
                alert("Terminé !");
                // Do something
            }
            
            ctrl.currentOpened = false;
        });

        $scope.$on('ngDropover.opening', function(event, dropObj) {
            ctrl.currentOpened = true;
        });

    }

})();