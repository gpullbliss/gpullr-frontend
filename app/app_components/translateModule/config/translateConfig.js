'use strict';
/* jshint maxparams: false */
angular.module('translateModule')
    .config(['$translateProvider', 'TranslateConstEn', 'TranslateConstEs', 'TranslateConstDe', 'TranslateConstIt', 'TranslateConstRu',
        function ($translateProvider, translateConstEn, translateConstEs, translateConstDe, translateConstIt, translateConstRu) {

            // add translation table
            $translateProvider
                // add translation tables
                .translations('en', translateConstEn)
                .translations('es', translateConstEs)
                .translations('de', translateConstDe)
                .translations('it', translateConstIt)
                .translations('ru', translateConstRu)
                 .preferredLanguage('en')

                // remember language
                .registerAvailableLanguageKeys(['en', 'es', 'de', 'it', 'ru'], {
                    'en_US': 'en',
                    'en_UK': 'en',
                    'es_ES': 'es',
                    'it_IT': 'it',
                    'de_DE': 'de',
                    'ru_RU': 'ru'
                });
        }]);
