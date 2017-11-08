(function () {
    'use strict';

    angular
        .module('app.edition')
        .controller('ModuleCtrl', ModuleCtrl)

    ModuleCtrl.$inject = ['editionFactory', '$scope'];

    function ModuleCtrl(editionFactory, $scope) {
        var vm = this;

        vm.data = editionFactory.translatableData.header;
        vm.onUpdate = onUpdate;

        function onUpdate(obj, prop, value) {
            obj[prop].value = value;

            $scope.$emit('tradChange');
        };
    }

}());