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
            template:'<div><button ng-click="vm.emitstatus()">test</button><div ng-transclude></div></div>',
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

    emitstatusController.$inject = ['$rootScope','$scope'];

    function emitstatusController($rootScope,$scope){

        var vm = this;

        vm.emitstatus = emitstatus;
        ///////////////////////////

        function emitstatus(s){
            $scope.$emit('eventest',0);
            //$rootScope.$broadcast('eventest',0);
            //$rootScope.$emit('eventest',0);
            alert('emitstatus fired !');
        }

    }

})();