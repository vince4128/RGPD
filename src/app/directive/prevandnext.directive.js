(function () {
    'use strict';

    angular
        .module('app.directive')
        .directive('prevandnext', prevandnext);

    //prevandnext.$inject = [];

    function prevandnext() {
        // Usage:
        //     <div data-prevandnext items="vm.section" current-item-index="vm.currentItemId"></div>
        // Creates:
        //
        var directive = {
            link: link,
            restrict: 'A',
            templateUrl: './app/template/prevandnext/prevandnext.html',
            scope: {
                items: '=',
                currentItemIndex: '=',
                currentSectionIndex: '='
            },
            controller: prevandnextController,
            controllerAs: 'vm',
            bindToController: true // because the scope is isolated
        };

        return directive;

        function link(scope, element, attrs) {
        }

    }

    prevandnextController.$inject = ['$scope'];

    function prevandnextController($scope) {

        var vm = this;

        vm.buttonHandler = buttonHandler;
        vm.emitstatus = emitstatus;
        vm.emitItemChange = emitItemChange;
        vm.emitSectionEnd = emitSectionEnd;
        
        ///////////////////////////

        function emitstatus(s){
            $scope.$emit('readevent', s);
        }

        function emitItemChange(){
            $scope.$emit('itemChange', vm.currentItemIndex);
        }

        function emitSectionEnd(goForward){
            var newIndex = goForward ? parseInt(vm.currentSectionIndex)+1 : parseInt(vm.currentSectionIndex)-1;
            $scope.$emit('sectionEnd', newIndex);
        }

        //à déclencher la première fois que l'on se rend sur un item ( rechargé au changement de section )
        vm.emitItemChange();

        ///////////////////////////

        function nextItem(){
            if(vm.currentItemIndex < vm.items.length-1){
                if(vm.items[vm.currentItemIndex].type === "text"){
                    vm.emitstatus(true);
                    vm.currentItemIndex++;
                } else {
                    if(vm.items[vm.currentItemIndex].read){
                        vm.currentItemIndex++;
                    }else{
                        alert('une action est nécessaire');
                        return false;
                    }
                }
                return true;
            }
            else
            {
                vm.emitSectionEnd(true);
                return false;
            }
        }

        function prevItem(){
            if(vm.currentItemIndex > 0){
                vm.currentItemIndex--;
                return true;
            }
            else{
                vm.emitSectionEnd(false);
                return false;
            }            
        }

        function buttonHandler(direction){
            var isOk = false;
            if(direction === "next")
            {
                isOk = nextItem();
            }
            else if (direction === "prev"){
                isOk = prevItem();
            }
            
            if(isOk)
            {
                vm.emitItemChange();
            }
        }
    }

})();