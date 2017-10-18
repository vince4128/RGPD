(function () {
    'use strict';

    angular
        .module('app.home')
        .controller('SectionCtrl', SectionCtrl);

    SectionCtrl.$inject = ["$log", "$stateParams", "_section","_suspend", "$scope", "scormService", "$rootScope", "$state", "quizService"];
    function SectionCtrl($log, $stateParams, _section, _suspend, $scope, scormService, $rootScope, $state, quizService) {
        var vm = this;
        vm.class = 'SectionCtrl';

        vm.section = _section;
        vm.sectionId = $stateParams.sectionId;
        vm.currentItemId = parseInt($stateParams.itemId);

        //récupérer l'item en cours dans le suspend
        var suspend = _suspend;
        
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
            data = angular.isUndefined(data) ? "0" : data;
            scormService.setLocation(vm.sectionId, data);
        });

        $scope.$on('sectionEnd', function(event, data) {
            if(data.direction)
            {
                vm.section.read = true;
                suspend.section[vm.sectionId].read = true;
                scormService.setSuspend(suspend);
            }
        });

        $scope.$on('quizEvent', function(event,data){
            suspend.section[vm.sectionId].item[vm.currentItemId].answerValue = data.value;
            suspend.section[vm.sectionId].item[vm.currentItemId].answer = data.answer;
            //mettre à jour dans le tableau de quizService
            scormService.setSuspend(suspend);
            quizService.updateTabQ(suspend);
            if(quizService.checkScore()){
                console.log("quizScorePercent : " + quizService.getQuizScorePercent());
                scormService.setScore(quizService.getQuizScorePercent());
            }
        });

        //////////////

        function activate() {
            $log.debug('Activating ' + vm.class);
        }
    }
})();
