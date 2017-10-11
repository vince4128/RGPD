(function(){
    'use strict';

    angular
        .module('app.newmodule')
        .controller('NewmoduleCtrl', NewmoduleCtrl)

    NewmoduleCtrl.$inject = ['_data', 'scormService', '$state'];

    function NewmoduleCtrl(_data, scormService, $state) {
        /* jshint validthis:true */
        var vm = this;

        // données récupérées du resolve dans le state
        vm.data = _data;

        activate();
        
        //si on a un location on se rend tout de suite sur la bonne page
        var _location = scormService.getLocation();
        if(_location)
        {
            var _locationValues = _location.split(",");
            $state.go("newmodule.section", {sectionId:_locationValues[0], itemId:_locationValues[1]});
        }

        function activate() { }
    }
})();