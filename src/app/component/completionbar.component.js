(function () {
    'use strict';

    angular
        .module('app.component')
        .component('completionBar', {
            bindings: {
                list: '<', //'='
                currentItemIndex: '<',
                currentIndex: '<',
                currentSectionIndex: '<'
            },
            templateUrl: './app/template/completionbar/completion_bar.html',
            controller: completionBarController
        });

    completionBarController.$inject = [];
    function completionBarController() {
        var ctrl = this;

        ctrl.getLength = getLength;

        ctrl.$onInit = function () {
            //ici nous avons accès aux valeurs de nos bindings
            //console.log("completionBar - onInit", ctrl.list);
        };

        function getLength(arr){
            var result = 0;
            for(var i=0; i<arr.length; i++)
            {
                result += arr[i].item.length;
            }
            return result;
        }
    }
})();