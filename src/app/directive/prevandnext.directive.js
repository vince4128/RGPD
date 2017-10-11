(function () {
    'use strict';

    angular
        .module('app.directive')
        .directive('prevandnext', prevandnext);

    //prevandnext.$inject = [];

    function prevandnext() {
        // Usage:
        //     <div data-prevandnext items="vm.section" current-item="vm.currentItem"></div>
        // Creates:
        //
        var directive = {
            link: link,
            restrict: 'A',
            templateUrl: './app/template/prevandnext/prevandnext.html',
            scope: {
                items: '=',
                currentItem: '='
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

        //vm.currentItem = 0;
        vm.nextItem = nextItem;
        vm.prevItem = prevItem;

        vm.emitstatus = emitstatus;
        ///////////////////////////

        function emitstatus(s){
            $scope.$emit('readevent',s);
        }

        function nextItem(){
            if(vm.currentItem < vm.items.length-1){
                if(vm.items[vm.currentItem].type === "text"){
                    vm.emitstatus(true);
                    vm.currentItem++;
                } else {
                    if(vm.items[vm.currentItem].read){
                        vm.currentItem++;
                    }else{
                        alert('une action est nécessaire');
                    }
                }
            }   
        }

        function prevItem(){
            if(vm.currentItem > 0){
                vm.currentItem--;
            }            
        }
    }

})();