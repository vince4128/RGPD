/*(function(){
    'use strict';

    angular
        .module('app')
        .factory('quizService', quizService)

    quizService.$inject = ['scormService'];

    function quizService(scormService) {

        var service = {
            tabQ : tabQ,
            setTabQ:setTabQ,
            setAnswerValue:setAnswerValue,
            quizScore:quizScore,
            quizScorePercent:quizScorePercent,
        };

        var tabQ = [];
        var quizScore = [0,0];
        var quizScorePercent = 0;

        return service;

        checkReprise();
        
        function setTabQ(q){
            tabQ.push(q);
            for(var i = 0; i<tabQ.length; i++){
                console.log(angular.toJson(tabQ[q.questionId]));
            }
            quizScore[1] = tabQ.length;
        }

        function setAnswerValue(qId,value,answer){
            tabQ[qId].answerValue = value;
            tabQ[qId].answer = answer;
            updateQuiz()
        }

        function updateQuiz(){
            var score = 0;
            for(var i = 0; i<tabQ.length; i++){
                if(tabQ[i].answerValue){
                    score++;
                }
            }
            quizScore = score;
            quizScorePercent = (quizScore*100) / tabQ.length;
            console.log("### score : " + quizScore);
            console.log("### scorePercent : " + quizScorePercent);
            console.log(scormService.existingSuspend);
        }

        function checkReprise(){

        }


    }
})();*/

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
            quizProgression:quizProgression
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
            for (var i = 0; i < _data.section.length; i++) {
                var currentObj = _data.section[i];
                for (var j = 0; j < currentObj.item.length; j++) {
                    console.log(angular.toJson(currentObj.item[j]));
                    if (currentObj.item[j].evaluated) {
                        tabQ.push(currentObj.item[j]);
                    }
                }
            }
            console.log("### TabQ = " + tabQ);
            for(var i = 0; i<tabQ.length; i++){
                console.log("### TABQ" + i + " : " + angular.toJson(tabQ[i]));
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
            console.log("### score : " + quizScore);
            console.log("### scorePercent : " + quizScorePercent);

            quizProgression = [progress,tabQ.length];
            console.log("### quizProgression : " + quizProgression);

            if(quizProgression[0] === quizProgression[1]){
                //envoyer le score
            }

        }

    }
})();