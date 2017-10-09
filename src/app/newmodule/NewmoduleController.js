(function () {
    'use strict';

    angular
        .module('app.newmodule')
        .controller('NewmoduleCtrl', NewmoduleCtrl)

    NewmoduleCtrl.$inject = ['$translate','$locale','$rootScope'];

    function NewmoduleCtrl($translate,$locale,$rootScope) {
        /* jshint validthis:true */
        var vm = this;

        vm.langue = $translate.use();//utile pour les images
        // + voir l'écouteur sur le $rootscope plus bas pour la maj de cette valeur

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

        $rootScope.$on('$translateChangeSuccess', function(event,data){//au changement de langage
            vm.langue = data.language;
        });

    }
})();