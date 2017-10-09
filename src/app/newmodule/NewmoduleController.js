(function () {
    'use strict';

    angular
        .module('app.newmodule')
        .controller('NewmoduleCtrl', NewmoduleCtrl)

    NewmoduleCtrl.$inject = ['$translate'];

    function NewmoduleCtrl($translate) {
        /* jshint validthis:true */
        var vm = this;

        vm.atraduire = ".TEST_HTML";
        vm.langChoice = "";
        vm.changeLanguage = changeLanguage;

        activate();

        function activate() { }

        function changeLanguage(langKey) {
            $translate.use(langKey);
        }

        //faire une traduction dans le code
        //ne fonctionne pas, à vérifier
        //alert(angular.toJson($translate('tradObj.TEST_HTML')));
        
    }
})();