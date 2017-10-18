(function () {
    'use strict';

    angular
        .module ('app.directive')
        .directive ('didacticiel', didacticiel);

    didacticiel.$inject = [];

    function didacticiel() {
        // Usage:
        //     <directive></directive>
        // Creates:
        //
        var directive = {
            link: link,
            restrict: 'A',
            templateUrl: './app/template/didacticiel/didacticiel.html',
            scope:{
                item: '='
            },
            controller: didacticielController,
            controllerAs: 'vm',
            bindToController: true
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }

    didacticielController.$inject = ['$scope'];

    function didacticielController($scope){

        var vm = this;
        //////////////

        vm.currentItem = null;
        vm.checkReadEvent = checkReadEvent;
        //////////////

        function checkReadEvent(){
            var allSeen = false;
            for(var i=0; i<vm.item.content.pointers.length; i++){
                if(!vm.item.content.pointers[i].seen){
                    return;
                }else{
                    allSeen = true;
                }
            }
            if(allSeen){
                $scope.$emit('readevent',true);
            }
        }

    }

})();