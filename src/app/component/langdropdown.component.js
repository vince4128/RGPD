(function () {
    'use strict';

    angular
        .module('app.component')
        .component('langdropdown', {
            templateUrl: './app/template/langdropdown/langdropdown.html',
            controller: langController
        });

    langController.$inject = ['$scope', 'localeService', '$translate'];

    function langController($scope, localeService, $translate) {
        var ctrl = this;
        ctrl.changeLanguage = changeLanguage;

        function changeLanguage(locale) {
            localeService.setLocaleByDisplayName(locale.key);
        };
        
        ctrl.$onInit = function () {
            ctrl.localesDisplayNames = localeService.getLocalesDisplayNames();
            ctrl.visible = ctrl.localesDisplayNames && ctrl.localesDisplayNames.length > 1;
            ctrl.currentLocaleDisplayName = ctrl.localesDisplayNames.find(getCurrentLocale);
        }

        function getCurrentLocale(element){
            return element.key === $translate.use();// langue en cours d'utilisation
        }
    };

})();