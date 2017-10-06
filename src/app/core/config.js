(function(){
    'use strict';

    angular
        .module('app.core')
        .config(configure)

    configure.$inject = [];

    configure.$inject = ['$logProvider','$exceptionHandlerProvider','$translateProvider']

    function configure($logProvider,$exceptionHandlerProvider,$translateProvider) {

        var french = {
            "tradObj":{
                "TITLE_ID":"Internationalisation",
                "LANGUAGE_ID":"Langues",
                "TEST_ID":"test français",
                "TEST_HTML":"<h4>Démo</h4> avec des balises html à interpréter",
                "TEST_PLURAL_ID":"{testCount, plural, =0{Résultat nul}, one{Résultat 1}, other{# Messages}}",//messageformat.js
                "TEST_GREETING_ID":"Salut {{name}} !",
                "TEST_KEY_IN_HTML":"Clé directement placé dans le .html",
                "TEST_WITH_FILTER_ID":"Traduis en utilisant un filtre"
            }
        }

        var english = {
            "tradObj":{
                "TITLE_ID":"Internationalization",
                "LANGUAGE_ID":"Language",
                "TEST_ID":"test anglais"
            }
        }

        $translateProvider.translations('fr', french);
        $translateProvider.preferredLanguage('fr');
        $translateProvider.fallbackLanguage('fr');

    }

}());