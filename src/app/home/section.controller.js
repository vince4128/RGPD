(function () {
    'use strict';

    angular
        .module('app.home')
        .controller('SectionCtrl', SectionCtrl);

    SectionCtrl.$inject = ["$log", "$stateParams", "_section","_suspend", "$scope", "scormService"];
    function SectionCtrl($log, $stateParams, _section, _suspend, $scope, scormService) {
        var vm = this;
        vm.class = 'SectionCtrl';

        vm.section = _section;
        vm.sectionId = $stateParams.sectionId;
        vm.currentItemId = parseInt($stateParams.itemId);

        //récupérer l'item en cours dans le suspend
        var suspend = _suspend;

        activate();
        
        /** Ecouteurs événements */

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

        $scope.$on('itemChange', function(event, data) {
            data = angular.isUndefined(data) ? "0" : data;
            scormService.setLocation(vm.sectionId, data);
        });

        //////////////

        function activate() {
            $log.debug('Activating ' + vm.class);
        }
    }
})();
