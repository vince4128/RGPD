(function () {
    'use strict';

    angular
        .module ('app.directive')
        .directive ('completionbar', completionbar);

    //emitstatus.$inject = [];

    function completionbar() {
        // Usage:
        //     <div data-completionbar></div data-completionbar>
        // Creates:
        //
        var directive = {
            link: link,
            restrict: 'E',
            templateUrl:'./app/template/completionbar/completionbar.html',
            scope:{
                sectionList: '=',
                currentItemIndex: '=',
                currentIndex: '=',
                currentSectionIndex: '='
            }
        };
        return directive;

        function link(scope, element, attrs) {
            scope.totalAll = getLength(scope.sectionList);
        }

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