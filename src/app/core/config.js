(function(){
    'use strict';

    angular
        .module('app.core')
        .config(configure)

    configure.$inject = [];

    configure.$inject = ['$logProvider','$exceptionHandlerProvider','$translateProvider']

    function configure($logProvider,$exceptionHandlerProvider,$translateProvider) {
        
        var french = {
            "Title":"Internationalisation",
            "Language":"Langues",
            "test":"test français"
        }

        var english = {
            "Title":"Internationalization",
            "Language":"Language",
            "test":"test anglais"
        }

    }

}());