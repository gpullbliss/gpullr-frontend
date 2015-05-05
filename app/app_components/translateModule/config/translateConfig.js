'use strict';
/* jshint maxparams: false */
angular.module('translateModule')
    .config(['$translateProvider', 'TranslateConstEn', 'TranslateConstEs', 'TranslateConstDe', 'TranslateConstIt', 'TranslateConstRu', 'TranslateConstTr', 'TranslateConstPl',
        function ($translateProvider ,translateConstEn, translateConstEs, translateConstDe, translateConstIt, translateConstRu, translateConstTr, translateConstPl) {
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
            // add relations
            .registerAvailableLanguageKeys(['en', 'de', 'it', 'pl', 'ru', 'tr'], {
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
            $translateProvider.useSanitizeValueStrategy('escaped');
    }]);