(function () {
    'use strict';

    angular
        .module('app.component')
        .component('langdropdown', {
            templateUrl: './app/template/langdropdown/langdropdown.html',
            controller: langController
        });

    langController.$inject = ['$scope', 'localeService'];

    function langController($scope, localeService) {
        var ctrl = this;
        ctrl.changeLanguage = changeLanguage;
        
        ctrl.currentLocaleDisplayName = localeService.getLocaleDisplayName();
        ctrl.localesDisplayNames = localeService.getLocalesDisplayNames();
        ctrl.visible = ctrl.localesDisplayNames && ctrl.localesDisplayNames.length > 1;

        function changeLanguage(locale) {
            localeService.setLocaleByDisplayName(locale);
        };
    };

})();