(function(){
    'use strict';

    angular
        .module('app.core')
        .factory('scormService', scormService)

    scormService.$inject = ['scormWrapper'];

    function scormService(scormWrapper) {
        //retourne un objet dans lequel on expose les méthodes et variables "publics"
        var service = {
            //initialisation et clôture
            initScorm: initScorm,
            endScorm: endScorm,
            //
            scormApiVersion:scormApiVersion,
            existingSuspend:existingSuspend,
            existingObjSuspend:existingObjSuspend,
            //getter et setter
            getScormVersion:getScormVersion,
            getSuspend:getSuspend,
            getObjSuspend:getObjSuspend,
            sendSuspend:sendSuspend,
            sendObjSuspend:sendObjSuspend,
            sendSessionTime: sendSessionTime,
            sendScore: sendScore,
            sendStatut: sendStatut,
        };

        //variable ici (avant le return sinon elles sont undefined)
        var startTime;
        var scormApiVersion = "";
        var existingObjSuspend = {};
        var existingSuspend = "";

        //appel de la méthode privée d'initialisation du service
        activate();

        //on retourne l'objet service
        return service;
        ///////////////

        /* Méthodes public (exposées) */

        //méthode d'initialisation de scorm
        function initScorm() {
            //Quelle version de scorm ?//
            console.log('# scormService lance setAPIVersion #');
            scormWrapper.setAPIVersion("Auto");
            //Initialiser le scorm
            scormWrapper.doLMSInitialize();
            var success = scormWrapper.isAvailable();
            console.log("# scormService Scorm init status : " + success);
            if(success){
              console.log("# scormService : connexion scorm initialisé");
              scormApiVersion = scormWrapper.getAPIVersion();
              console.log("# scormService : version de scorm : " + scormApiVersion);
              //On va initialiser le statut à incomplet pour surcharger le comportement des LMS
              if(scormApiVersion === "1.2"){
                var success = scormWrapper.doLMSSetValue('cmi.core.lesson_status','incomplete');
                if(success){
                    console.log("# scormService : statut changé à " + scormWrapper.doLMSGetValue('cmi.core.lesson_status'));
                }
              } else {
                //initialiser le statut à incomplete en scorm 2004

                //a supp une fois OK
                console.log("# scormService Le code pour scorm 2004 n'a pas encore été écrit");

              }
              //initialiser le suspend
              initSuspend(); 
            } else {
              console.log("# scormService : connexion scorm pas initialisé");
            }
         }

        //méthode de clôture de la sessison scorm
        function endScorm(){

            //a supp une fois ok
            console.log("# scormService : ça va couper !");

            //on envoie le temps
            sendSessionTime();
            scormWrapper.doLMSCommit();
            scormWrapper.doLMSFinish();

        }

        //méthode d'envoi du temps
        function sendSessionTime(){

            console.log("# scormService Session Time à envoyer");

            var dtm = new Date();
            var n = dtm.getTime() - startTime;

            if(scormApiVersion === "1.2"){

                //a supp une fois OK
                console.log("# scormService : envoi du temps du temps pour du Scorm " + scormApiVersion);

                scormWrapper.doLMSSetValue('cmi.core.session_time',convertTime(n));

            }else{

                //a supp une fois OK
                console.log("# scormService Le code pour scorm 2004 n'a pas encore été écrit");

            }
            
        }

        //méthode d'envoi du score
        function sendScore(score){
            console.log("# scormService : envoi du score");
            if(scormApiVersion === "1.2"){
                var success = scormWrapper.doLMSSetValue('cmi.core.score.raw',score);
                if(success){
                    console.log("# scormService : Le score à été envoyé " + scormWrapper.doLMSGetValue('cmi.core.score.raw'));
                }
            }else{
                //écrire le code pour scorm 2004 a supp une fois OK
                console.log("# scormService Le code pour scorm 2004 n'a pas encore été écrit");
            }
        }

        //méthode d'envoi du status
        function sendStatut(status){
            console.log("# scormService : envoi du statut");
            if(scormApiVersion === "1.2"){
                var success = scormWrapper.doLMSSetValue('cmi.core.lesson_status',status);
                if(success){
                    console.log("# scormService : Le status a été mis à jour avec la valeur " + scormWrapper.doLMSGetValue('cmi.core.lesson_status'));
                }else{
                    //écrire le code pour scorm 2004 a supp une fois OK
                    console.log("# scormService Le code pour scorm 2004 n'a pas encore été écrit");
                }
            }
        }

        //méthode de mise à jour de suspend

        //getter & setter

        //méthode de récupération de la version de scorm
        function getScormVersion(){
            if(scormApiVersion){
                return scormApiVersion;
            }
        }

        //méthode de récupération du suspend brut
        function getSuspend(){
            if(scormApiVersion === "1.2"){
                var success = scormWrapper.doLMSGetValue('cmi.suspend_data');
                if(success){
                    console.log("# scormSerice : Suspend récupéré avec la valeur : " + success);
                    existingSuspend = success;
                    return existingSuspend;
                }
            }else{
                //écrire le code pour scorm 2004 a supp une fois OK
                console.log("# scormService Le code pour scorm 2004 n'a pas encore été écrit");

            }
        }

        //méthode pour envoyer le suspend brut
        function sendSuspend(newSuspend){
            if(scormApiVersion === "1.2"){
                var success = scormWrapper.doLMSSetValue('cmi.suspend_data',newSuspend);
                if(success){
                    console.log("# scormService : Suspend mis à jour avec la valeur : " + scormWrapper.doLMSGetValue('cmi.suspend_data'));
                }
            }else{
                //écrire le code pour scorm 2004 a supp une fois OK
                console.log("# scormService Le code pour scorm 2004 n'a pas encore été écrit");
            }
        }

        //méthode de récupération du suspend objet
        function getObjSuspend(){
            if(scormApiVersion === "1.2"){
                var success = scormWrapper.doLMSGetValue('cmi.suspend_data');
                if(success){
                    console.log("# scormSerice : Suspend récupéré avec la valeur : " + success);
                    existingObjSuspend = angular.fromJson(success);
                    return existingObjSuspend;
                }
            }else{
                //écrire le code pour scorm 2004 a supp une fois OK
                console.log("# scormService Le code pour scorm 2004 n'a pas encore été écrit");

            }
        }

        //méthode pour envoyer le suspend objet
        function sendObjSuspend(newSuspend){
            if(scormApiVersion === "1.2"){
                var success = scormWrapper.doLMSSetValue('cmi.suspend_data',angular.toJson(newSuspend));
                if(success){
                    console.log("# scormService : Suspend mis à jour avec la valeur : " + scormWrapper.doLMSGetValue('cmi.suspend_data'));
                }
            }else{
                //écrire le code pour scorm 2004 a supp une fois OK
                console.log("# scormService Le code pour scorm 2004 n'a pas encore été écrit");
            }
        }

        /* Méthodes privée (non exposées) */

        //méthode privée d'initialisation du service
        function activate(){
            //on récupère la date pour le calcul du temps de la session
            startTime = new Date().getTime();
        }

        //Méthode de conversion du temps
        function convertTime(n){

            //a supp une fois OK
            console.log("# scormService : conversion du temps");

            if(scormApiVersion === "1.2"){

                //a supp une fois OK
                console.log("# scormService : conversion du temps pour du Scorm " + scormApiVersion);

                var hms = "";
                var dtm = new Date();
                dtm.setTime(n);
                var h = "0" + Math.floor(n/3600000);
                var m = "0" + dtm.getMinutes();
                var s = "0" + dtm.getSeconds();
                hms = h.substr(h.length-2)+":"+m.substr(m.length-2)+":";
                hms += s.substr(s.length-2);

                //a supp une fois OK
                console.log("# scormService : temps à envoyer " + hms);

                return hms;

            }
        }

        //méthode d'initialisation du suspend
        function initSuspend(){
            existingSuspend = getSuspend();
            //existingObjSuspend = getObjSuspend();
        }

    }
})();