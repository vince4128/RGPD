(function () {
    'use strict';

    angular
        .module ('app.directive')
        .directive ('emitstatus', emitstatus);

    //emitstatus.$inject = [];

    function emitstatus() {
        // Usage:
        //     <div data-emitstatus></div data-emitstatus>
        // Creates:
        //
        var directive = {
            link: link,
            restrict: 'A',
            templateUrl:'./app/template/emitstatus/emitstatus.html',
            scope:{

            },
            controller: emitstatusController,
            controllerAs: 'vm',
            bindToController:true, // because the scope is isolated
            transclude:true
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }

    emitstatusController.$inject = ['$scope'];

    function emitstatusController($scope){

        var vm = this;

        vm.emitstatus = emitstatus;
        ///////////////////////////

        function emitstatus(s){
            $scope.$emit('readevent',s);
        }

    }

})();