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

        ctrl.doOptions = {
            closeWhenClickOff: false,
            position: 'bottom-left',
            verticalOffset: 10,
            triggerEvent: 'none'
          };

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

        function close(index){
            var currentDropover = 'myDropover'+index;
            $rootScope.$emit('ngDropover.close', currentDropover);
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

        $rootScope.$on('ngDropover.closing', function(event, dropObj) {
            ctrl.currentItem++;
            ctrl.currentOpened = false;

            if(ctrl.currentItem >= ctrl.item.content.pointers.length) {
                alert("Terminé !");
                // Do something
            }
            //console.log('closing', dropObj.id);
        });

        $rootScope.$on('ngDropover.opening', function(event, dropObj) {
            // Do something
            //console.log('opening', dropObj.id);
        });

    }

})();