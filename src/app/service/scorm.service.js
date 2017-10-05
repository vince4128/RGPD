(function(){
    'use strict';

    angular
        .module('app.core')
        .factory('scormService', scormService)

    scormService.$inject = ['scormWrapper'];

    function scormService(scormWrapper) {
        var service = {
            initScorm: initScorm,
            scormApiVersion:scormApiVersion
        };

        //variable ici (avant le return)
        var startTime;
        var scormApiVersion = "";
        var objSuspend = {};

        return service;
        ///////////////

        function initScorm() {
            //Quelle version de scorm ?//
            console.log('# scormService lance setAPIVersion #');
            scormWrapper.setAPIVersion("Auto");
            //Initialiser le scorm
            scormWrapper.doLMSInitialize("cmi.core.lesson_status","incomplete");
            var success = scormWrapper.isAvailable;
            console.log("# scormService Scorm init status : " + success);
            if(success){
              console.log("# scormService : connexion scorm initialisé");
              var apiVersion = scormWrapper.getAPIVersion();
              console.log("# scormService : version de scorm : " + apiVersion);  
            } else {
              console.log("# scormService : connexion scorm pas initialisé");
            }
         }
    }
})();