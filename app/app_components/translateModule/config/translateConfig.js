'use strict';
/* jshint maxparams: false */
angular.module('translateModule')
    .config(['$translateProvider', 'TranslateConstEn', 'TranslateConstDe', 'TranslateConstIt', 'TranslateConstRu', function ($translateProvider, translateConstEn, translateConstDe, translateConstIt, translateConstRu) {

        // add translation table
        $translateProvider
            // add translation tables
            .translations('en', translateConstEn)
            .translations('de', translateConstDe)
            .translations('it', translateConstIt)
            .translations('ru', translateConstRu)
            .preferredLanguage('en')

            // remember language
            .registerAvailableLanguageKeys(['en', 'de', 'it', 'ru'], {
                'en_US': 'en',
                'en_UK': 'en',
                'it_IT': 'it',
                'ru_RU': 'ru',
                'de_DE': 'de'
            });
    }]);
