(function () {
    'use strict';

    angular
        .module('app.component')
        .component('prevandnext', {
            bindings: {
                items: '<',
                currentItemIndex:'=',
                currentSectionIndex:'='
            },
            templateUrl: './app/template/prevandnext/prevandnext.html',
            controller: prevandnextController
        });

    prevandnextController.$inject = ['$scope']

    function prevandnextController($scope) {

        var ctrl = this;
        ////////////////

        ctrl.buttonHandler = buttonHandler;
        ctrl.emitstatus = emitstatus;
        ctrl.emitItemChange = emitItemChange;
        ctrl.emitSectionEnd = emitSectionEnd;
        
        ///////////////////////////

        function emitstatus(s){
            $scope.$emit('readevent', s);
        }

        function emitItemChange(){
            $scope.$emit('itemChange', ctrl.currentItemIndex);
        }

        function emitSectionEnd(goForward){
            var newIndex = goForward ? parseInt(ctrl.currentSectionIndex)+1 : parseInt(ctrl.currentSectionIndex)-1;
            $scope.$emit('sectionEnd', {index:newIndex, direction:goForward});
        }

        //à déclencher la première fois que l'on se rend sur un item ( rechargé au changement de section )
        ctrl.emitItemChange();

        ///////////////////////////

        var actionRequiredTypes = ["qsimple", "clicktosee", "video", "didacticiel", "introquiz", "orderlist"];

        function nextItem(){
            
            //est-ce que j'attends une action de l'utilisateur ?
            if(actionRequiredTypes.indexOf(ctrl.items[ctrl.currentItemIndex].type) != -1)
            {
                //est-ce que cette action a été résolue ?
                if(!ctrl.items[ctrl.currentItemIndex].read)
                {
                    //si non on stoppe ici
                    alert('une action est nécessaire');
                    return false;
                }
            }
            else
            {
                //je n'attends pas d'action, je signale que l'item a été vu
                ctrl.emitstatus(true);
            }

            //suis-je à la fin de la section ?
            if(ctrl.currentItemIndex == ctrl.items.length-1)
            {
                //si oui je n'essaye pas d'aller plus loin
                ctrl.emitSectionEnd(true);
                return false;
            }
            else
            {
                //sinon on avance
                ctrl.currentItemIndex++;
                return true;
            }
        }

        function prevItem(){
            if(ctrl.currentItemIndex > 0){
                ctrl.currentItemIndex--;
                return true;
            }
            else{
                ctrl.emitSectionEnd(false);
                return false;
            }            
        }

        function buttonHandler(direction){
            var isOk = false;
            if(direction === "next")
            {
                isOk = nextItem();
            }
            else if (direction === "prev"){
                isOk = prevItem();
            }
            
            if(isOk)
            {
                ctrl.emitItemChange();
            }
        }

        ctrl.$onInit = function () {
            //ici nous avons accès aux valeurs de nos bindings
        };

    }

})();