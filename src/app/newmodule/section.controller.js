/**
 * @author sberthe
 * @since 10/6/2017
 */
(function () {
    'use strict';

    angular
        .module('app.newmodule')
        .controller('SectionCtrl', SectionCtrl);

    SectionCtrl.$inject = ["$log", "$stateParams", "_section"];
    function SectionCtrl($log, $stateParams, _section) {
        var vm = this;
        vm.class = 'SectionCtrl';

        vm.sectionId = $stateParams.sectionId;

        vm.section = _section;

        activate();

        //////////////

        function activate() {
            $log.debug('Activating ' + vm.class);
        }
    }
})();
