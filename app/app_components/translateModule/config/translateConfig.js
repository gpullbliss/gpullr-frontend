'use strict';
/* jshint maxparams: false */
angular.module('translateModule')
    .config(['$translateProvider', 'TranslateConstEn', 'TranslateConstDe', 'TranslateConstIt', 'TranslateConstPl', 'TranslateConstRu', function ($translateProvider, translateConstEn, translateConstDe, translateConstIt, translateConstPl, translateConstRu) {

        // add translation table
        $translateProvider
            // add translation tables
            .translations('en', translateConstEn)
            .translations('de', translateConstDe)
            .translations('it', translateConstIt)
            .translations('ru', translateConstRu)
            .translations('pl', translateConstPl)
            .preferredLanguage('en')

            // remember language
            .registerAvailableLanguageKeys(['en', 'de', 'it', 'pl', 'ru'], {
                'de_AT': 'de',
                'de_CH': 'de',
                'de_DE': 'de',
                'en_UK': 'en',
                'en_US': 'en',
                'it_IT': 'it',
                'pl_PL': 'pl',
                'ru_RU': 'ru'
            });
    }]);
