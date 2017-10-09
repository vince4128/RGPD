(function(){
    'use strict';

    angular
        .module('app.newmodule')
        .controller('NewmoduleCtrl', NewmoduleCtrl)

    NewmoduleCtrl.$inject = ['_data'];

    function NewmoduleCtrl(_data) {
        /* jshint validthis:true */
        var vm = this;

        // données récupérées du resolve dans le state
        vm.data = _data;

        activate();

        function activate() { }
    }
})();