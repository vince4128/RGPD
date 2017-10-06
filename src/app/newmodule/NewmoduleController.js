(function(){
    'use strict';

    angular
        .module('app.newmodule')
        .controller('NewmoduleCtrl', NewmoduleCtrl)

        NewmoduleCtrl.$inject = [];

    function NewmoduleCtrl() {
        /* jshint validthis:true */
        var vm = this;

        vm.atraduire = ".TEST_HTML";

        activate();

        function activate() { }
    }
})();