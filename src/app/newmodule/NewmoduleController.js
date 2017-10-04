(function(){
    'use strict';

    angular
        .module('app.newmodule')
        .controller('NewmoduleCtrl', NewmoduleCtrl)

        NewmoduleCtrl.$inject = [];

    function NewmoduleCtrl() {
        /* jshint validthis:true */
        var vm = this;

        activate();

        function activate() { }
    }
})();