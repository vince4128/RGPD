(function () {
    'use strict';

    angular
        .module('app.component')
        .component('completionHome', {
            bindings: {
                list: '<', //'='
                currentIndex: '<',
            },
            templateUrl: './app/template/completionbar/completion_home.html',
            controller: completionHomeController
        });

    completionHomeController.$inject = [];
    function completionHomeController() {
        var ctrl = this;

        ctrl.getLength = getLength;
        ctrl.getCurrent = getCurrent;

        ctrl.$onInit = function () {
            //ici nous avons accès aux valeurs de nos bindings
            //console.log("completionHome - onInit", ctrl.list);
        };

        function getLength(arr){
            var result = 0;
            for(var i=0; i<arr.length; i++)
            {
                result += arr[i].item.length;
            }
            return result;
        }

        function getCurrent(arr){
            var result = 0;
            for(var i=0; i<arr.length; i++){
                if(arr[i].read){
                    result++;
                }
            }
            return result;
        }
    }
})();