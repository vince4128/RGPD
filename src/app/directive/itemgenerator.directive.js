(function () {
    'use strict';

    angular
        .module('app.directive')
        .directive('itemgenerator', itemgenerator);

    itemgenerator.$inject = ['$compile'];

    function itemgenerator($compile) {
        // Usage:
        //     <div itemgenerator item="item"></div>
        // Creates:
        //
        var directive = {
            link: link,
            restrict: 'A',
            scope: {
                item: '=',
            }
        };
        return directive;

        function link(scope, element, attrs) {
            var generatedTemplate = '<div data-' + scope.item.type + ' ' + 'item="item"' + '></div>';
            element.append($compile(generatedTemplate)(scope));
        }
    }

})();