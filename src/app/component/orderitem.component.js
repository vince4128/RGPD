(function () {
    'use strict';

    angular
        .module('app.component')
        .component('orderItem', {
            bindings: {
                item: '<',
                max: '<',
                updateList: '&'
            },
            templateUrl: './app/template/orderlist/orderitem.html',
            controller: orderitemController
        });

    orderitemController.$inject = [];
    function orderitemController() {
        var ctrl = this;

        ctrl.$onInit = function () {
            //
        };

        ctrl.move = function (direction) {
            var oldIndex = ctrl.item.index;
            var newIndex = ctrl.item.index + direction;

            //ctrl.item.index += direction;

            ctrl.updateList({ item: ctrl.item, oldIndex: oldIndex, newIndex: newIndex });
        };
    };

})();