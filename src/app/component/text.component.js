(function () {
    'use strict';

    angular
        .module('app.component')
        .component('text', {
            bindings: {
                item: '<'
            },
            templateUrl: './app/template/text/text.html',
            controller: textController
        });

    function textController() {

        var ctrl = this;

        ctrl.$onInit = function () {
            //ici nous avons accès aux valeurs de nos bindings
        };

    }

})();