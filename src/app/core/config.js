(function () {
    'use strict';

    angular
        .module('app.core')
        .config(configure)
        .run(runApp)

    configure.$inject = ['$logProvider', '$exceptionHandlerProvider', '$translateProvider']

    function configure($logProvider, $exceptionHandlerProvider, $translateProvider) {

        $translateProvider
            .registerAvailableLanguageKeys(
            ['fr'],
            {
                'fr*': 'fr',
                '*': 'fr' // doit être en dernier (fallback "bricolé").
            }
            )
            .preferredLanguage('fr')//le langage que nous voulons utiliser
            //.fallbackLanguage('en')//si un langage par ex cz est choisi alors qu'il n'existe pas alors l'anglais sera présenté (fonctionne pas pour l'instant)
            .useStaticFilesLoader({//les fichiers doivent être nommés comme les clés utilisés (fr,en,etc...)
                prefix: './app/lang/',
                suffix: '.json'
            })
            .useSanitizeValueStrategy('sanitize');

    }

    runApp.$inject = ['$rootScope'];

    function runApp($rootScope) {
        $rootScope.$on('$translateChangeSuccess', function () {
            console.log('Translation change success!');
        });
        $rootScope.$on('$translateChangeError', function () {
            console.log('Translation change Error!');
        });
    }


}());