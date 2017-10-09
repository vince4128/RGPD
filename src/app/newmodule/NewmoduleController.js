(function () {
    'use strict';

    angular
        .module('app.newmodule')
        .controller('NewmoduleCtrl', NewmoduleCtrl)

    NewmoduleCtrl.$inject = ['_data'];

    function NewmoduleCtrl(_data) {
        /* jshint validthis:true */
        var vm = this;

        // données récupérées du resolve dans le state
        vm.data = _data;

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