(function () {
    'use strict';

    angular
        .module('app.component')
        .component('orderlist', {
            bindings: {
                item: '<'
            },
            templateUrl: './app/template/orderlist/orderlist.html',
            controller: orderlistController
        });

    orderlistController.$inject = ['orderByFilter'];
    function orderlistController(orderBy) {
        var ctrl = this;
        ctrl.shuffledItems = [];

        ctrl.$onInit = function () {
            //TODO : test si déjà fait (read)

            //console.log("orderitems", ctrl.item.content.orderitems);

            //make a copy of items so the shuffling may never return the original order
            angular.copy(ctrl.item.content.orderitems, ctrl.shuffledItems);

            //create an array of indices as many of items, ex: [0,1,2,3]
            var shuffledIndices = Array.apply(null, { length: ctrl.shuffledItems.length }).map(Function.call, Number);
            //and shuffle it, ex: [3,1,0,2]
            shuffle(shuffledIndices);

            //console.log("shuffledIndices", shuffledIndices);

            //create index property on list items, and set it shuffledIndices
            for (var i = 0; i < ctrl.item.content.orderitems.length; i++) {
                ctrl.shuffledItems[i].index = shuffledIndices[i];
            }

            //sort shuffled indices
            ctrl.shuffledItems = orderBy(ctrl.shuffledItems, 'index', false);

            //console.log("shuffledItems", ctrl.shuffledItems);
        };

        ctrl.update = function (item, oldIndex, newIndex) {
            ctrl.shuffledItems[oldIndex].index = newIndex;
            ctrl.shuffledItems[newIndex].index = oldIndex;

            //tri sur index property
            ctrl.shuffledItems = orderBy(ctrl.shuffledItems, 'index', false);
        };

        ctrl.validate = function () {
            //compare item index property with item order property
            $scope.$emit('readevent', true);
        };

        ctrl.correction = function () {
            //orderBy on order property
        };
    }

    function shuffle(items) {
        for (var i = items.length; i-- > 1;) {
            var j = Math.floor(Math.random() * i);
            var tmp = items[i];
            items[i] = items[j];
            items[j] = tmp;
        }
    }

})();