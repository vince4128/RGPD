/**
 * @author sberthe
 * @since 10/6/2017
 */
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

        vm.currentItem = 0;

        activate();

        $scope.$on('eventest', function(event, data) {
            vm.section.item[vm.currentItem].seen = data;
        });

        //////////////

        function activate() {
            $log.debug('Activating ' + vm.class);
        }
    }
})();
