(function () {
    'use strict';

    angular
        .module('app.edition')
        .controller('ModuleCtrl', ModuleCtrl)

    ModuleCtrl.$inject = ['editionFactory'];

    function ModuleCtrl(editionFactory) {
        var vm = this;

        vm.data = editionFactory.translatableData.header;
        vm.onUpdate = onUpdate;

        function onUpdate(obj, prop, value) {
            obj[prop].value = value;
            //console.log(prop + ' ' + obj[prop], obj);
        };
    }

}());