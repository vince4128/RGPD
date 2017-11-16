(function () {
    'use strict';

    angular
        .module('app.edition')
        .controller('EditionCtrl', EditionCtrl)

    EditionCtrl.$inject = ['_data', 'editionFactory', '$scope', '$rootScope', '$state'];

    function EditionCtrl(_data, editionFactory, $scope, $rootScope, $state) {
        var vm = this;
        vm.data = _data;
        vm.doSave = doSave;

        vm.modelChanged = false;
        vm.tradChanged = false;

        $scope.$on('modelChange', function (event, data) {
            vm.modelChanged = true;
        });

        $scope.$on('tradChange', function (event, data) {
            vm.tradChanged = true;
        });

        function doSave() {
            if(vm.tradChanged)
            {
                editionFactory.setTranslations();
                vm.tradChanged = false;
            }
            if(vm.modelChanged)
            {
                editionFactory.setData(vm.data);
                vm.modelChanged = false;
            }
        }

        $rootScope.$on('$translateChangeSuccess', function () {
            //TODO : demander d'enregistrer les modifs en cours
            vm.data = editionFactory.getTranslatableData();
            $state.reload();
        });
    }
})();