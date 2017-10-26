(function () {
    'use strict';

    angular
        .module ('app.component')
        .component ('qsimple', {
            bindings: {
                item: '<'
            },
            templateUrl: './app/template/qsimple/qsimple.html',
            controller: qsimpleController
        });

    qsimpleController.$inject = ['$scope','quizService'];

    function qsimpleController($scope,quizService){

        var ctrl = this;
        ////////////////

        ctrl.radio = { checked:null };
        ctrl.feedback = {display: false, feedOk: null};

        ctrl.check = check;
        ctrl.reset = reset;
        ctrl.answerValue = null;
        ////////////////////////

        function check() {
            if(ctrl.radio.checked || ctrl.radio.checked === 0){
                $scope.$emit('readevent',true);
                //checker la rep
                if(ctrl.item.content.proposal[ctrl.radio.checked].value) {
                    //la réponse est bonne
                    ctrl.feedback.feedOk = true;
                    ctrl.answerValue = true;
                } else {
                    //la réponse est fausse
                    ctrl.feedback.feedOk = false;
                    ctrl.answerValue = false;
                }
                $scope.$emit('dataEvent', ctrl.item.content);
                if(ctrl.item.content.evaluated){
                    quizService.setAnswerValue(ctrl.item.questionId,ctrl.answerValue,ctrl.radio.checked);
                }
                $scope.$emit('quizEvent', {answer:ctrl.radio.checked,value:ctrl.answerValue});
            } else {
                alert('veuillez sélectionner une réponse');
            }
        }

        function reset(){
            ctrl.radio.checked = null;
        }

    }

} ());