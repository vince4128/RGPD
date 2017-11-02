
(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('quizService', quizService)

    quizService.$inject = [];

    function quizService() {

        var service = {
            tabQ: tabQ,
            setTabQ: setTabQ,
            updateTabQ:updateTabQ,
            quizScore:quizScore,
            quizScorePercent,quizScorePercent,
            quizProgression:quizProgression,
            getQuizScorePercent:getQuizScorePercent,
            checkScore:checkScore
        };

        var tabQ = [];
        var quizScore = [0,0];
        var quizScorePercent = 0;
        var quizProgression = [0,0];

        return service;

        function setTabQ(_data) {
            //au cas ou _data est undefined
            if(!_data){
                console.log("quizService attention le suspend est undefined pour quizService !");
                return;
            }
            for (var i = 0; i < _data.length; i++) {
                var currentObj = _data[i];
                if (currentObj.length > 2) {
                    tabQ.push(currentObj);
                }
            }
        }

        function updateTabQ(_data){
            tabQ = [];
            setTabQ(_data);
            updateQuiz();
        }

        function updateQuiz(){
            var score = 0;
            var progress = 0;
            for(var i = 0; i<tabQ.length; i++){
                if(tabQ[i].answerValue){
                    score++;
                }

                if(tabQ[i].answer){
                    progress++;
                }
            }
            quizScore = score;
            quizScorePercent = (quizScore*100) / tabQ.length;
            quizProgression = [progress,tabQ.length];
        }

        function getQuizScorePercent(){
            return quizScorePercent;
        }

        function checkScore(){
            if(quizProgression[0] === quizProgression[1]){                
                return true;
            }else{                
                return false;
            }
        }

    }
})();