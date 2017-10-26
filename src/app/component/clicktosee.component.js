(function(){
    'use strict';

    angular
        .module('app.component')
        .component('clicktosee', {
            bindings: {
                item: '<'
            },
            templateUrl: './app/template/clicktosee/clicktosee.html',
            controller: clicktoseeController
        });

    clicktoseeController.$inject = ['$scope'];

    function clicktoseeController($scope){

        var ctrl = this;
        ////////////////

        ctrl.currentItem = null;
        ctrl.checkReadEvent = checkReadEvent;
        /////////////////

        function checkReadEvent(){
            var allSeen = false;
            console.log(ctrl.item.content.clickableitem);
            for(var i=0; i<ctrl.item.content.clickableitem.length; i++){
                if(!ctrl.item.content.clickableitem[i].seen){
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