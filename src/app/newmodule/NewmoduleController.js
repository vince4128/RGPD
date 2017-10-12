(function(){
    'use strict';

    angular
        .module('app.newmodule')
        .controller('NewmoduleCtrl', NewmoduleCtrl)

    NewmoduleCtrl.$inject = ['_data', 'scormService', '$state', '$rootScope', "$scope"];

    function NewmoduleCtrl(_data, scormService, $state, $rootScope, $scope) {
        /* jshint validthis:true */
        var vm = this;

        // données récupérées du resolve dans le state
        vm.data = _data;

        activate();

        function activate() { 
            //si on a un location on se rend tout de suite sur la bonne page
            var _location = scormService.getLocation();
            if(_location && !$rootScope.locationRead)
            {
                $rootScope.locationRead = true;
                var _locationValues = _location.split(",");
                $state.go("newmodule.section", {sectionId:_locationValues[0], itemId:_locationValues[1]});
            }
        }
    }
})();