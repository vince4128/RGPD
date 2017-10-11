(function () {
    'use strict';

    angular
        .module('app.newmodule')
        .controller('SectionCtrl', SectionCtrl);

    SectionCtrl.$inject = ["$log", "$stateParams", "_section", "$scope"];
    function SectionCtrl($log, $stateParams, _section, $scope) {
        var vm = this;
        vm.class = 'SectionCtrl';

        vm.sectionId = $stateParams.sectionId;

        vm.section = _section;
        
        vm.currentItem = parseInt($stateParams.itemId);

        activate();

        $scope.$on('readevent', function(event, data) {
            vm.section.item[vm.currentItem].read = data;
        });

        //////////////

        function activate() {
            $log.debug('Activating ' + vm.class);
        }
    }
})();
