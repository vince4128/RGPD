(function () {
    'use strict';

    angular
        .module('app.home')
        .controller('SectionCtrl', SectionCtrl);

    SectionCtrl.$inject = ["$log", "$stateParams", "_section", "$scope", "scormService", "quizService"];
    function SectionCtrl($log, $stateParams, _section, $scope, scormService, quizService) {
        var vm = this;
        vm.class = 'SectionCtrl';

        vm.section = _section;
        vm.sectionId = $stateParams.sectionId;
        vm.currentItemId = parseInt($stateParams.itemId);

        //récupérer l'item en cours dans le suspend
        // /!\ quand le suspend n'est pas crée par le module mais récupéré sur la plateforme, à cause de l'asynchronicité la ligne suivante n'est pas bonne.
        //il faudrait lancer la ligne suivante que quand c'est ok.
        var suspend = scormService.existingSuspend;
        
        /*var isEmpty = angular.equals(suspend, {});

        if(isEmpty){
            alert('Fuck it is empty !');
        }else{
            alert('suspend dans sectionController ' + angular.toJson(suspend));
        }

        $scope.$watch(scormService.existingSuspend, suspendChange);

        function suspendChange(newValue, oldValue, scope){
            alert('le watch a fonctionné');
            alert(angular.toJson(newValue));
            alert(angular.toJson(scormService.existingSuspend));
        }*/

        activate();
        
        /** Ecouteurs événements */

        $scope.$on('readevent', function(event, data) {
            vm.section.item[vm.currentItemId].read = data;

            //mettre à jour l'item en cours dans le suspend
            suspend.section[vm.sectionId].item[vm.currentItemId].read = data;
            scormService.setSuspend(suspend);
        });

        $scope.$on('dataEvent', function(event, data) {
            //trop dense pour le suspend
            /*suspend.section[vm.sectionId].item[vm.currentItemId].data = data;
            scormService.setSuspend(suspend);*/
        });

        $scope.$on('itemChange', function(event, data) {
            //trop dense pour le suspend
            /*data = angular.isUndefined(data) ? "0" : data;
            scormService.setLocation(vm.sectionId, data);*/
        });

        $scope.$on('quizEvent', function(event,data){
            suspend.section[vm.sectionId].item[vm.currentItemId].answerValue = data.value;
            suspend.section[vm.sectionId].item[vm.currentItemId].answer = data.answer;
            //mettre à jour dans le tableau de quizService
            scormService.setSuspend(suspend);
            quizService.updateTabQ(suspend);
            if(quizService.checkScore()){
                scormService.setScore(quizService.getQuizScorePercent);
            }
        });

        //////////////

        function activate() {
            $log.debug('Activating ' + vm.class);
        }
    }
})();
