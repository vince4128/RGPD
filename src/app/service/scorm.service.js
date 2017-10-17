(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('scormService', scormService)

    scormService.$inject = ['scormWrapper', 'quizService'];

    function scormService(scormWrapper, quizService) {
        //retourne un objet dans lequel on expose les méthodes et variables "publics"
        var service = {
            //initialisation et clôture
            initScorm: initScorm,
            endScorm: endScorm,
            //
            scormApiVersion: scormApiVersion,
            existingSuspend: existingSuspend,
            createSuspend: createSuspend,
            //getter et setter
            getScormVersion: getScormVersion,
            getSuspend: getSuspend,
            getScore: getScore,
            getStatus: getStatus,
            getLocation: getLocation,
            setSuspend: setSuspend,
            setSessionTime: setSessionTime,
            setScore: setScore,
            setStatus: setStatus,
            setLocation: setLocation
        };

        //variable ici (avant le return sinon elles sont undefined)
        var startTime;
        var scormApiVersion = "";
        var existingSuspend = {};
        //
        var LESSON_STATUS = function () {
            return (scormApiVersion === "1.2") ? 'cmi.core.lesson_status' : 'cmi.completion_status';
        }
        var LOCATION = function () {
            return (scormApiVersion === "1.2") ? 'cmi.core.lesson_location' : 'cmi.location';
        }
        var SESSION_TIME = function () {
            return (scormApiVersion === "1.2") ? 'cmi.core.session_time' : 'cmi.session_time';
        }
        var SCORE = function () {
            return (scormApiVersion === "1.2") ? 'cmi.core.score.raw' : 'cmi.score.scaled';
        }
        var SUCCESS_STATUS = 'cmi.success_status'; //2004 only
        var SUSPEND_DATA = 'cmi.suspend_data'; //same for both
        //
        var INCOMPLETE = 'incomplete';
        var COMPLETED = 'completed';
        var FAILED = 'failed';
        var PASSED = 'passed';

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
            if (success) {
                console.log("# scormService : connexion scorm initialisé");
                scormApiVersion = scormWrapper.getAPIVersion();
                console.log("# scormService : version de scorm : " + scormApiVersion);
                //On va initialiser le statut à incomplet pour surcharger le comportement des LMS
                var success = scormWrapper.doLMSSetValue(LESSON_STATUS(), INCOMPLETE);
                console.log("# scormService : LESSON_STATUS() " + LESSON_STATUS() + " " + INCOMPLETE);
                if (success) {
                    console.log("# scormService : statut changé à " + scormWrapper.doLMSGetValue(LESSON_STATUS()));

                } else {
                    console.log("# scormService set LESSON_STATUS() failed");
                }
                //initialiser le suspend
                initSuspend();
            } else {
                console.log("# scormService : connexion scorm pas initialisée");
            }
        }

        //méthode de clôture de la sessison scorm
        function endScorm() {

            //a supp une fois ok
            console.log("# scormService : ça va couper !");

            //on envoie le temps
            setSessionTime();
            scormWrapper.doLMSCommit();
            scormWrapper.doLMSFinish();

        }

        /**
         * getter & setter
         */

        //méthode d'envoi du score
        function setScore(_score) {
            console.log("# scormService : envoi du score");
            var success = scormWrapper.doLMSSetValue(SCORE(), _score);
            if (success) {
                console.log("# scormService : Le score à été envoyé " + scormWrapper.doLMSGetValue(SCORE()));

            } else {
                //écrire le code pour scorm 2004 a supp une fois OK
                console.log("# scormService setScore failed");
            }
        }

        //méthode pour récupérer le score
        function getScore() {
            console.log("# récupération du score ");
            var success = scormWrapper.doLMSGetValue(SCORE());
            if (success) {
                console.log("# scormService : le score a bien été récupéré " + success);
                return success;
            } else {
                //écrire le code pour scorm 2004 a supp une fois OK
                console.log("# scormService : getScore failed");
            }
        }

        //méthode d'envoi du status
        function setStatus(_status) {
            console.log("# scormService : envoi du statut");
            var success = scormWrapper.doLMSSetValue(LESSON_STATUS(), _status);
            if (success) {
                console.log("# scormService : Le status a été mis à jour avec la valeur " + scormWrapper.doLMSGetValue(LESSON_STATUS()));
            } else {
                //écrire le code pour scorm 2004 a supp une fois OK
                console.log("# scormService : setStatus failed");
            }
        }

        //méthode pour récupérer le statut
        function getStatus() {
            console.log("# récupération du statut");
            var success = scormWrapper.doLMSGetValue(LESSON_STATUS());
            if (success) {
                console.log("# scormService : le statut a bien été récupéré " + success);
                return success;
            } else {
                //écrire le code pour scorm 2004 a supp une fois OK
                console.log("# scormService : getStatus failed");
            }
        }

        //méthode de récupération de la version de scorm
        function getScormVersion() {
            if (scormApiVersion) {
                return scormApiVersion;
            }
        }

        //méthode de récupération du suspend brut
        function getSuspend() {
            var success = scormWrapper.doLMSGetValue(SUSPEND_DATA);
            if (success) {
                console.log("# scormSerice : Suspend récupéré avec la valeur : " + success);
                existingSuspend = angular.fromJson(success);
                return existingSuspend;
            } else {
                //écrire le code pour scorm 2004 a supp une fois OK
                console.log("# scormService : getSuspend failed");
                return {};
            }
        }

        //méthode pour envoyer le suspend brut
        function setSuspend(_suspend) {
            //TODO : vérifier taille de l'objet envoyé ( SPM: 4096 )
            var success = scormWrapper.doLMSSetValue(SUSPEND_DATA, angular.toJson(_suspend));
            if (success) {
                console.log("# scormService : Suspend mis à jour avec la valeur : " + scormWrapper.doLMSGetValue(SUSPEND_DATA));
            } else {
                console.log("# scormService : setSuspend failed");
            }
        }

        //méthode d'envoi du location
        function setLocation(_section, _item) {
            var _location = _section+","+_item;

            console.log("# scormService : envoi du location :" + _location);
            
            var success = scormWrapper.doLMSSetValue(LOCATION(), _location);
            if (success) {
                console.log("# scormService : Le location a été mis à jour avec la valeur " + scormWrapper.doLMSGetValue(LOCATION()));
            } else {
                //écrire le code pour scorm 2004 a supp une fois OK
                console.log("# scormService : set location failed");
            }
        }

        //méthode pour récupérer le location
        function getLocation() {
            console.log("# récupération du location ");

            var success = scormWrapper.doLMSGetValue(LOCATION());
            if (success) {
                console.log("# scormService : le location a bien été récupéré " + success);
                return success;
            }
            else {
                console.log("# scormService : le location n'a pas été récupéré ");
                return "";
            }
        }

        /**
         * Méthodes privées (non exposées)
         */

        //méthode privée d'initialisation du service
        function activate() {
            //on récupère la date pour le calcul du temps de la session
            startTime = new Date().getTime();
        }

        //méthode d'envoi du temps
        function setSessionTime() {

            var dtm = new Date();
            var milliSecondsElapsed = dtm.getTime() - startTime;

            var success = scormWrapper.doLMSSetValue(SESSION_TIME(), convertTime(milliSecondsElapsed));
            if (success) {
                console.log("# scormService : set sessionTime worked");
            } else {
                console.log("# scormService : set sessionTime failed");
            }

        }

        //Méthode de conversion du temps
        function convertTime(_milliSecondsElapsed) {

            //a supp une fois OK
            console.log("# scormService : conversion du temps pour du Scorm " + scormApiVersion);

            var hms;

            if (scormApiVersion === "1.2") {
                hms = "";
                var dtm = new Date();
                dtm.setTime(_milliSecondsElapsed);
                var h = "0" + Math.floor(_milliSecondsElapsed / 3600000);
                var m = "0" + dtm.getMinutes();
                var s = "0" + dtm.getSeconds();
                hms = h.substr(h.length - 2) + ":" + m.substr(m.length - 2) + ":";
                hms += s.substr(s.length - 2);
            }
            else if (scormApiVersion === "2004") {
                var nbMilliSeconds = _milliSecondsElapsed;
                var nbHours = Math.floor(nbMilliSeconds / 3600000);
                var iTemp = nbHours * 60;
                var nbMinutes = Math.floor((nbMilliSeconds / 60000) - iTemp);
                iTemp = (iTemp + nbMinutes) * 60;
                var nbSeconds = Math.floor((nbMilliSeconds / 1000) - iTemp);
                nbHours = "000" + nbHours;
                nbMinutes = "0" + nbMinutes;
                nbSeconds = "0" + nbSeconds;

                hms = "PT" + nbHours.substr(nbHours.length - 4) + "H" + nbMinutes.substr(nbMinutes.length - 2) + "M" + nbSeconds.substr(nbSeconds.length - 2) + "S";
            }
            else {
                console.log("# scormService : convertTime failed");
                return;
            }

            //a supp une fois OK
            console.log("# scormService : convertTime => " + hms);

            return hms;
        }

        //méthode d'initialisation du suspend
        function initSuspend() {
            existingSuspend = getSuspend();

            //a supp une fois OK
            if(!angular.equals(existingSuspend, {})){
                console.log("suspend existe " + existingSuspend);
                quizService.setTabQ(existingSuspend);
            }

        }

        //on initialise l'objet suspend avec les données du module
        function createSuspend(_data) {
            var result = {};
            result.section = [];

            for (var i = 0; i < _data.section.length; i++) {
                var currentObj = _data.section[i];
                result.section[i] = new Section(currentObj.id);

                for (var j = 0; j < currentObj.item.length; j++) {
                    var currentItem = currentObj.item[j];
                    result.section[i].item[j] = new Item(currentItem.id, currentItem.evaluated);
                }
            }

            quizService.setTabQ(result);

            return result;
        }

        function Section(id) {
            this.id = id;
            this.read = false;
            this.item = [];
        }

        var qId = 0;

        function Item(id,evaluated,qId) {
            this.id = id;
            this.read = false;
            //on ajoute une propriété pour les items qui doivent être pris en compte dans la note
            if(evaluated){
                this.evaluated = true;
            }
        }

    }
})();