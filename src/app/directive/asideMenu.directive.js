(function () {
    'use strict';

    angular
        .module('app.directive')
        .directive('aside', aside);

    aside.$inject = ['$document'];

    function aside($document){

        var directive = {
            restrict: 'A',
            link:link
        }

        return directive;

        function link(scope, element, attrs){
            element.bind('click', toggleElement);
            function toggleElement(){
              var body = $document[0].body;
              body.classList.toggle('menu--open');
            }
        }

    };
 

}());