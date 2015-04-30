'use strict';
/* jshint maxparams: false */
angular.module('translateModule')
    .config(['$translateProvider', 'TranslateConstEn', 'TranslateConstDe', 'TranslateConstIt', 'TranslateConstRu', 'TranslateConstTr',
        function ($translateProvider, translateConstEn, translateConstDe, translateConstIt, translateConstRu, translateConstTr) {

            // add translation table
            $translateProvider
                // add translation tables
                .translations('en', translateConstEn)
                .translations('de', translateConstDe)
                .translations('it', translateConstIt)
                .translations('ru', translateConstRu)
                .translations('tr', translateConstTr)
                .preferredLanguage('en')

                // remember language
                .registerAvailableLanguageKeys(['en', 'de', 'it', 'ru', 'tr'], {
                    'en_US': 'en',
                    'en_UK': 'en',
                    'it_IT': 'it',
                    'de_DE': 'de',
                    'ru_RU': 'ru',
                    'tr_TR': 'tr'
                });
        }]);
