(function () {
    'use strict';

    angular
        .module('app.component')
        .component('orderItem', {
            bindings: {
                item: '<',
                max: '<',
                index: '<',
                updateList: '&'
            },
            templateUrl: './app/template/orderlist/orderitem.html',
            controller: orderitemController
        });

    orderitemController.$inject = ['$element', '$scope'];
    function orderitemController($element, $scope) {
        var ctrl = this;

        ctrl.$onInit = function () {
            //
            $element.css({
                'top': ctrl.item.index * 130 + 'px'
            });
        };

        ctrl.$onChanges = function(changesObj){
            //console.log("changesObj", changesObj);
            $element.css({
                'top': ctrl.item.index * 130 + 'px'
            });
        }
        
        ctrl.move = function (direction) {
            var oldIndex = ctrl.item.index;
            var newIndex = ctrl.item.index + direction;

            ctrl.updateList({ item: ctrl.item, oldIndex: oldIndex, newIndex: newIndex });
        };
    };

})();