(function(){
    'use strict';

    angular
        .module('app.directive')
        .directive('chart',chart);

    function chart(){

        var directive = {
            restrict:'A',
            scope:{
                arraydata:'=',
                type:'='
            },
            link:link,
            templateUrl:'./app/template/chart/chart.html',
            transclude:true
        };

        return directive;
        /////////////////

        function link(scope, element, attrs){

            var chartcanvas = angular.element(document.querySelector('#'+ attrs.id + ' canvas').getContext('d'));
            var chart = new Chart(chartcanvas, {
                type:scope.type,
                data: {
                    datasets: [{
                        data: scope.arraydata,
                        backgroundColor: ["#85d259", "rgba(255,122,81,0.9)"]
                    }],
                    labels: ["Progression","Reste à faire"]
                },
                options:{
                    responsive: true,
                    elements: { arc: { borderWidth: 0 } }
                }
            });

        }

    }

}());