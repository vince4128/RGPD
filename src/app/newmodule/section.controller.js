(function () {
    'use strict';

    angular
        .module('app.newmodule')
        .controller('SectionCtrl', SectionCtrl);

    SectionCtrl.$inject = ["$log", "$stateParams", "_section", "$scope", "scormService"];
    function SectionCtrl($log, $stateParams, _section, $scope, scormService) {
        var vm = this;
        vm.class = 'SectionCtrl';

        vm.section = _section;
        vm.sectionId = $stateParams.sectionId;
        vm.currentItemId = parseInt($stateParams.itemId);

        //récupérer l'item en cours dans le suspend
        var suspend = scormService.existingSuspend;

        activate();

        $scope.$on('readevent', function(event, data) {
            vm.section.item[vm.currentItemId].read = data;

            //mettre à jour l'item en cours dans le suspend
            suspend.section[vm.sectionId].item[vm.currentItemId].read = data;
            scormService.setSuspend(suspend);
        });

        $scope.$on('dataEvent', function(event, data) {
            suspend.section[vm.sectionId].item[vm.currentItemId].data = data;
            scormService.setSuspend(suspend);
        });

        //////////////

        function activate() {
            $log.debug('Activating ' + vm.class);
        }
    }
})();
