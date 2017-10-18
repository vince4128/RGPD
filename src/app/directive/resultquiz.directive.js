(function () {
    'use strict';

    angular
        .module ('app.directive')
        .directive ('resultquiz', resultquiz);

    resultquiz.$inject = ['$window','quizService'];

    function resultquiz($window, quizService) {
        // Usage:
        //     <directive></directive>
        // Creates:
        //
        var directive = {
            link: link,
            restrict: 'A',
            templateUrl:'./app/template/quiz/resultquiz.html',
            scope:{
                item: '='
            },
            controller: resultquizController,
            controllerAs: 'vm',
            bindToController:true
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }

    resultquizController.$inject = ['quizService'];

    function resultquizController(quizService){

        var vm = this;
        //////////////

        vm.score = quizService.getQuizScorePercent();

    }

})();