(function () {
    'use strict';

    angular
        .module ('app.directive')
        .directive ('clicktosee', clicktosee);

    //clicktosee.$inject = [];

    function clicktosee() {
        // Usage:
        //     <div data-clicktosee item="item"></div data-clicktosee item="item">
        // Creates:
        //
        var directive = {
            link: link,
            restrict: 'A',
            templateUrl: './app/template/clicktosee/clicktosee.html',
            scope: {
                item: '='
            },
            controller: clicktoseeController,
            controllerAs: 'vm',
            bindToController: true
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }

    clicktoseeController.$inject = ['$scope'];

    function clicktoseeController($scope) {

        var vm = this;
        //////////////

        vm.currentItem = null;
        vm.checkReadEvent = checkReadEvent;
        //////////////

        function checkReadEvent(){
            var allSeen = false;
            for(var i=0; i<vm.item.content.length; i++){
                if(!vm.item.content[i].seen){
                    return;
                }else{
                    allSeen = true;
                }
            }
            if(allSeen){
                $scope.$emit('readevent',true);
            }
        }

    }

})();