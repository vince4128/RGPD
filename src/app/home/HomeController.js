(function(){
    'use strict';

    angular
        .module('app.home')
        .controller('homeCtrl', homeCtrl)

    homeCtrl.$inject = ['_data', 'scormService', '$state', '$rootScope', "$scope"];

    function homeCtrl(_data, scormService, $state, $rootScope, $scope) {
        /* jshint validthis:true */
        var vm = this;

        // données récupérées du resolve dans le state
        vm.data = _data;

        //reroutage à la sortie d'une section
        $scope.$on('sectionEnd', function(event, data) {
            var isOk = vm.data.section.length > data && data >= 0;
            if(isOk && !$rootScope.returnToHomeAtSectionEnd)
            {
                $state.go('home.section', {sectionId:data, itemId:0});
            }
            else
            {
                $state.go('home');
            }
        });

        activate();

        function activate() { 
            //si on a un location on se rend tout de suite sur la bonne page
            var _location = scormService.getLocation();
            if(_location && !$rootScope.locationRead)
            {
                $rootScope.locationRead = true;
                var _locationValues = _location.split(",");
                $state.go("home.section", {sectionId:_locationValues[0], itemId:_locationValues[1]});
            }
        }
    }
})();