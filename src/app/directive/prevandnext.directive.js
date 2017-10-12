(function () {
    'use strict';

    angular
        .module('app.directive')
        .directive('prevandnext', prevandnext);

    //prevandnext.$inject = [];

    function prevandnext() {
        // Usage:
        //     <div data-prevandnext items="vm.section" current-item="vm.currentItemIndex"></div>
        // Creates:
        //
        var directive = {
            link: link,
            restrict: 'A',
            templateUrl: './app/template/prevandnext/prevandnext.html',
            scope: {
                items: '=',
                currentItemIndex: '='
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

        //vm.currentItemIndex = 0;
        vm.nextItem = nextItem;
        vm.prevItem = prevItem;

        vm.emitstatus = emitstatus;
        ///////////////////////////

        function emitstatus(s){
            $scope.$emit('readevent',s);
        }

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
                    }
                }
            }   
        }

        function prevItem(){
            if(vm.currentItemIndex > 0){
                vm.currentItemIndex--;
            }            
        }
    }

})();