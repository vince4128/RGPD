(function () {
    'use strict';

    angular
        .module('app.component')
        .component('resultquiz', {
            bindings: {
                item: '<'
            },
            templateUrl: './app/template/quiz/resultquiz.html',
            controller: resultquizController
        });

    resultquizController.$inject = ['quizService']

    function resultquizController(quizService) {

        var ctrl = this;
        ////////////////

        ctrl.score = quizService.getQuizScorePercent();

        ctrl.$onInit = function () {
            //ici nous avons accès aux valeurs de nos bindings
            //console.log("completionBar - onInit", ctrl.list);
        };

    }

})();