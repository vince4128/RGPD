(function(){
    'use strict';

    angular
        .module('app.layout')
        .controller('LayoutCtrl', homeCtrl)

    homeCtrl.$inject = ['dataService','scormService', '$state', '$rootScope', '$scope', 'ngDialog'];

    function homeCtrl(dataService, scormService, $state, $rootScope, $scope, ngDialog) {
        /* jshint validthis:true */
        var vm = this;
        vm.data = {"test":"test"};

        activate();

        function activate() { 
            //récupération des données pour que celles-ci soient accessibles dans le menu
            dataService.getData(true).then(function(resp){
                vm.data = resp;
            });
            return vm.data;
        }
    }
})();