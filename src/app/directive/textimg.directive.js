(function () {
    'use strict';

    angular
        .module ('app.directive')
        .directive ('textimg', textimg);

    //txtimg.$inject = [];

    function textimg() {
        // Usage:
        //     <div data-textimg item="item"></div >
        // Creates:
        //
        var directive = {
            link: link,
            restrict: 'A',
            templateUrl: './app/template/textimg/textimg.html',
            scope: {
                item: '='
            },
            controller: textimgController,
            controllerAs: 'vm',
            bindToController:true
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }

    //textimgController.$inject = ['$scope'];

    function textimgController(){

        var vm = this;
        //////////////

    }

})();