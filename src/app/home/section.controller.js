(function () {
    'use strict';

    angular
        .module('app.home')
        .controller('SectionCtrl', SectionCtrl);

    SectionCtrl.$inject = ["$log", "$stateParams", "_section","_suspend", "$scope", "scormService", "$rootScope", "$state", "quizService"];
    function SectionCtrl($log, $stateParams, _section, _suspend, $scope, scormService, $rootScope, $state, quizService) {
        var vm = this;
        vm.class = 'SectionCtrl';

        //données héritées de homeController
        vm.inheritedData = $scope.vm.data.section;

        vm.section = _section;
        vm.sectionId = $stateParams.sectionId;
        vm.currentItemId = parseInt($stateParams.itemId);
        vm.currentPageIndex = vm.inheritedData[vm.sectionId].item[vm.currentItemId].page;

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
            //trop dense pour le suspend
            
            /**
             * TODO : 
             * 0. définir un id unique pour chaque section et item
             * 1. aplanir le data une première fois ( ex : {id:"1", read:true}, {id:"2",read:false} ... )
             * 2. transformer le résultat aplati en chaîne de caractères ( ex : 1,1|2,0 ... ) pour envoyer à SCORM
             * 3. dans data.service, quand on récupère le suspend, il faut récréer un objet ( ex : {id:"10", read:true}, {id:"11",read:false} ... )
             * 4. dans data.service, comparer les id et attribuer la bonne valeur à la propriété read 
             */
            data = angular.isUndefined(data) ? "0" : data;
            scormService.setLocation(vm.sectionId, data);

            vm.currentPageIndex = vm.inheritedData[vm.sectionId].item[data].page;
        });

        $scope.$on('sectionEnd', function(event, data) {
            /**
             * TODO : plutôt vérifier que tous les items sont read = true
             */
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
