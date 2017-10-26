(function () {
    'use strict';

    angular
        .module('app.component')
        .component('introquiz', {
            bindings: {
                item: '<'
            },
            templateUrl: './app/template/quiz/introquiz.html',
            controller: introquizController
        });

    introquizController.$inject = ['$scope'];

    function introquizController($scope) {

        var ctrl = this;

        ctrl.ok = ok;
        ///////////

        function ok(){
            $scope.$emit('readevent',true);
        }

        ctrl.$onInit = function () {
            //ici nous avons accès aux valeurs de nos bindings
            //console.log("completionBar - onInit", ctrl.list);
        };

    }

})();