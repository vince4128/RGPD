(function () {
    'use strict';

    angular
        .module ('app.directive')
        .directive ('didacticiel', didacticiel);

    didacticiel.$inject = [];

    function didacticiel() {
        // Usage:
        //     <directive></directive>
        // Creates:
        //
        var directive = {
            link: link,
            restrict: 'A',
            templateUrl: './app/template/didacticiel/didacticiel.html',
            scope:{

            },
            controller: didacticielController,
            controllerAs: 'vm',
            bindToController: true
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }

    //didacticielController.$inject = [''];

    function didacticielController(){

        var vm = this;
        //////////////

    }

})();