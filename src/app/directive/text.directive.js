(function () {
    'use strict';

    angular
        .module ('app.directive')
        .directive ('text', text);

    text.$inject = [];

    function text() {
        // Usage:
        //     <directive></directive>
        // Creates:
        //
        var directive = {
            link: link,
            restrict: 'A',
            templateUrl:'./app/template/text/text.html',
            scope:{
                item: '='
            },
            controller: textController,
            controllerAs: 'vm',
            bindToController:true,
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }

    //textController.$inject = ['$scope'];

    function textController(){

        var vm = this;
        //////////////

    }

})();