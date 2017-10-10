(function () {
    'use strict';

    angular
        .module('app.directive')
        .directive('prevandnext', prevandnext);

    //prevandnext.$inject = [];

    function prevandnext() {
        // Usage:
        //     <div data-prevandnext></div>
        // Creates:
        //
        var directive = {
            link: link,
            restrict: 'A',
            templateUrl: 'app/template/prevandnext/prevandnext.html',
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

    //prevandnextController.$inject = [];

    function prevandnextController() {

        var vm = this;

        //vm.currentItem = 0;
        vm.nextItem = nextItem;
        vm.prevItem = prevItem;
        ///////////////////////

        function nextItem(){
            if(vm.currentItem < vm.items.item.length-1){
                vm.currentItem++;
            }      
        }

        function prevItem(){
            if(vm.currentItem > 0){
                vm.currentItem--;
            }            
        }
    }

})();