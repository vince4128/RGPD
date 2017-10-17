(function () {
    'use strict';

    angular
        .module ('app.directive')
        .directive ('introquiz', introquiz);

    introquiz.$inject = ['$window'];

    function introquiz($window) {
        // Usage:
        //     <directive></directive>
        // Creates:
        //
        var directive = {
            link: link,
            restrict: 'A',
            templateUrl:'./app/template/quiz/introquiz.html',
            scope:{
                item: '='
            },
            controller: introquizController,
            controllerAs: 'vm',
            bindToController:true
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }

    introquizController.$inject = ['$scope'];

    function introquizController($scope){

        var vm = this;

        vm.ok = ok;
        ///////////

        function ok(){
            $scope.$emit('readevent',true);
        }

    }

})();