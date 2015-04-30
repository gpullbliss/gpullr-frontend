'use strict';
/* jshint maxparams: false */
angular.module('translateModule')
<<<<<<< HEAD
    .config(['$translateProvider', 'TranslateConstEn', 'TranslateConstEs', 'TranslateConstDe', 'TranslateConstIt', 'TranslateConstRu', 'TranslateConstTr', 'TranslateConstPl',
        function ($translateProvider, translateConstEn, translateConstEs, translateConstDe, translateConstIt, translateConstRu, translateConstTr, translateConstPl) {
=======
    .config(['$translateProvider', 'TranslateConstEn', 'TranslateConstDe', 'TranslateConstIt', 'TranslateConstPl', 'TranslateConstRu',
        function ($translateProvider, translateConstEn, translateConstDe, translateConstIt, translateConstPl, translateConstRu) {
>>>>>>> e1834ebc204c18e8fd655390b494795e788cb55f

        // add translation table
        $translateProvider
            // add translation tables
            .translations('en', translateConstEn)
            .translations('es', translateConstEs)
            .translations('de', translateConstDe)
            .translations('it', translateConstIt)
            .translations('ru', translateConstRu)
            .translations('tr', translateConstTr)
            .translations('pl', translateConstPl)
            .preferredLanguage('en')

            // remember language
<<<<<<< HEAD
            .registerAvailableLanguageKeys(['en', 'de', 'it', 'pl', 'ru', 'tr'], {
=======
            .registerAvailableLanguageKeys(['en', 'de', 'it', 'pl', 'ru'], {
>>>>>>> e1834ebc204c18e8fd655390b494795e788cb55f
                'de_AT': 'de',
                'de_CH': 'de',
                'de_DE': 'de',
                'en_UK': 'en',
                'en_US': 'en',
                'es_ES': 'es',
                'it_IT': 'it',
                'ru_RU': 'ru',
                'tr_TR': 'tr',
                'pl_PL': 'pl'
            });
    }]);
