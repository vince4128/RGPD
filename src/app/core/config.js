(function () {
    'use strict';

    angular
        .module('app.core')
        .config(configure)

    configure.$inject = ['$logProvider', '$exceptionHandlerProvider', '$translateProvider']

    function configure($logProvider, $exceptionHandlerProvider, $translateProvider) {

        $translateProvider
            .preferredLanguage('fr')
            .useStaticFilesLoader({//les fichiers doivent être nommés comme les clés utilisés (fr,en,etc...)
                prefix: '/app/lang/',
                suffix: '.json'
            })
            .useSanitizeValueStrategy('sanitize')
            .fallbackLanguage('fr');

    }

}());