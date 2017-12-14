(function(){
    'use strict';

    angular
        .module('app.home')
        .controller('homeCtrl', homeCtrl)

    homeCtrl.$inject = ['_data', 'scormService', '$state', '$rootScope', '$scope', 'ngDialog'];

    function homeCtrl(_data, scormService, $state, $rootScope, $scope, ngDialog) {
        /* jshint validthis:true */
        var vm = this;

        // données récupérées du resolve dans le state
        vm.data = _data;

        vm.inExo = false;
        vm.checkAvailability = checkAvailability;
        //console.log(vm.data);

        //reroutage à la sortie d'une section
        $scope.$on('sectionEnd', function(event, data) {
            var isOk = vm.data.section.length > data.index && data.index >= 0;
            if(isOk && !$rootScope.returnToHomeAtSectionEnd)
            {
                var newItemId = data.direction ? 0 : vm.data.section[data.index].item.length - 1;
                $state.go('home.section', {sectionId:data.index, itemId:newItemId});
            }
            else
            {
                vm.inExo = false;
                $state.go('home');
            }
        });

        //observation des stateParams
        $scope.$watchCollection(function(){
            return $state.params;
        }, function(){
            if($state.params.sectionId){
                vm.inExo = true;
            }else{
                vm.inExo = false;
            }
        });

        activate();

        function activate() { 
            //si on a un location on demande à l'utilisateur s'il veut revenir là où il s'est arrêté
            var _location = scormService.getLocation();
            if(_location && !$rootScope.locationRead)
            {
                var dialog = ngDialog.open({
                    template: "./app/template/popup/reprisePopup.html",
                    showClose: false
                });
    
                dialog.closePromise.then(function (data) {
                    $rootScope.locationRead = true;
                    if (data.value && data.value != 0) {
                        var _locationValues = _location.split(",");
                        $state.go("home.section", {sectionId:_locationValues[0], itemId:_locationValues[1]});
                    }
                });
            }
        }

        function checkAvailability(id){
            if(id == 0){
                return 'home.section({ sectionId: section.id, itemId: 0 })';
            }else{
                return vm.data.section[id-1].read ? 'home.section({ sectionId: section.id, itemId: 0 })' : '-';
            }            
        }
    }
})();