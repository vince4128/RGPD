(function () {
    'use strict';

    angular
        .module('app.component')
        .component('textimg', {
            bindings: {
                item: '<'
            },
            templateUrl: './app/template/textimg/textimg.html',
            controller: textimgController
        });

    function textimgController() {

        var ctrl = this;

        ctrl.$onInit = function () {
            //ici nous avons accès aux valeurs de nos bindings
        };

    }

})();