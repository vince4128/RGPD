(function () {
    'use strict';

    angular
        .module('app.core')
        .service('localeService', localeService)

    localeService.$inject = ['$translate', '$rootScope'];

    function localeService($translate, $rootScope) {
        // PREPARING LOCALES INFO
        var localesObj = {
            'fr': 'Français',
            'en': 'English'
        };

        // locales and locales display names
        var _LOCALES = Object.keys(localesObj);
        if (!_LOCALES || _LOCALES.length === 0) {
            console.error('There are no _LOCALES provided');
        }
        var _LOCALES_DISPLAY_NAMES = [];
        _LOCALES.forEach(function (locale) {
            var _localeObj = {"key": locale, "value":localesObj[locale]};
            _LOCALES_DISPLAY_NAMES.push(_localeObj);//localesObj[locale]);
        });

        // STORING CURRENT LOCALE
        var currentLocale = $translate.proposedLanguage();// because of async loading

        // METHODS
        var checkLocaleIsValid = function (locale) {
            console.log("checkLocaleIsValid", locale);
            return _LOCALES.indexOf(locale) !== -1;
        };

        var setLocale = function (locale) {
            console.log("setLocale", locale);
            if (!checkLocaleIsValid(locale)) {
                console.error('Locale name "' + locale + '" is invalid');
                return;
            }
            currentLocale = locale;// updating current locale
            console.log("setLocale", locale);
            // asking angular-translate to load and apply proper translations
            $translate.use(locale);
        };

        // EVENTS
        // on successful applying translations by angular-translate
        $rootScope.$on('$translateChangeSuccess', function (event, data) {
            document.documentElement.setAttribute('lang', data.language);// sets "lang" attribute to html

            // asking angular-dynamic-locale to load and apply proper AngularJS $locale setting
            //tmhDynamicLocale.set(data.language.toLowerCase().replace(/_/g, '-'));
        });

        var service = {
            getLocaleDisplayName: function () {
                return localesObj[currentLocale];
            },
            setLocaleByDisplayName: function (localeDisplayName) {
                setLocale(localeDisplayName);
            },
            getLocalesDisplayNames: function () {
                return _LOCALES_DISPLAY_NAMES;
            },
            getCurrentLocale: function(){
                return currentLocale;
            }
        };

        return service;
    }
})();