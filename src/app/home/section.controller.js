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
            suspend.section[vm.sectionId].item[vm.currentItemId].read = data; //dataService.setSuspendValue(data);
            scormService.setSuspend(suspend);
        });

        $scope.$on('dataEvent', function(event, data) {
            //trop dense pour le suspend
            /*suspend.section[vm.sectionId].item[vm.currentItemId].data = data;
            scormService.setSuspend(suspend);*/
        });

        $scope.$on('itemChange', function(event, data) {
            //trop dense pour le suspend
            
            // autre possibilité : stocker dans le location, l'endroit le plus loin où l'on est allé. Mais ça ne marche que si la lecture du module n'est pas libre.
            data = angular.isUndefined(data) ? "0" : data;
            scormService.setLocation(vm.sectionId, data);

            // met à jour la CompletionBar
            vm.currentPageIndex = vm.inheritedData[vm.sectionId].item[data].page;
        });

        $scope.$on('sectionEnd', function(event, data) {
            // on vérifie que tous les éléments sont lus
            var allItemsRead = false;
            var itemsRead = 0;
            for(var i=0; i<suspend.section[vm.sectionId].item.length; i++)
            {
                if (suspend.section[vm.sectionId].item[i].read)
                {
                    itemsRead++;
                }
            }
            if(itemsRead == suspend.section[vm.sectionId].item.length)
            {
                allItemsRead = true;
            }

            if(allItemsRead && data.direction)
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
