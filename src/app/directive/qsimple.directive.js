(function () {
    'use strict';

    angular
        .module('app.directive')
        .directive('qsimple', qsimple);

    qsimple.$inject = [];

    function qsimple() {
        // Usage:
        //     <div data-qsimple item="item"></div>
        // Creates:
        //
        var directive = {
            link: link,
            restrict: 'A',
            templateUrl: './app/template/qsimple/qsimple.html',
            scope: {
                item: '='
            },
            controller: qsimpleController,
            controllerAs: 'vm',
            bindToController: true
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }

    qsimpleController.$inject = ['$scope','quizService'];

    function qsimpleController($scope,quizService) {

        var vm = this;
        //////////////

        vm.radio = { checked: null };
        vm.feedback = { display: false, feedOk: null };

        vm.check = check;
        vm.reset = reset;
        vm.answerValue = null;
        //////////////

        function check() {
            if (vm.radio.checked || vm.radio.checked === 0) {
                $scope.$emit('readevent',true);
                //checker la rep
                if (vm.item.content.proposal[vm.radio.checked].value) {
                    //la réponse est bonne
                    vm.feedback.feedOk = true;
                    vm.answerValue = true;
                } else {
                    //la réponse est fausse
                    vm.feedback.feedOk = false;
                    vm.answerValue = false;
                }
                $scope.$emit('dataEvent', vm.item.content)
                if(vm.item.content.evaluated){
                    quizService.setAnswerValue(vm.item.questionId,vm.answerValue,vm.radio.checked);
                }
                $scope.$emit('quizEvent', {answer:vm.radio.checked, value:vm.answerValue});
            }else{
                alert('veuillez sélectionner une réponse');
            }

        }

        function reset() {
            vm.radio.checked = null;
        }

    }

})();