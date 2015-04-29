'use strict';
angular.module('translateModule')
    .config(['$translateProvider', 'TranslateConstEn', 'TranslateConstDe', 'TranslateConstIt', function ($translateProvider, translateConstEn, translateConstDe, translateConstIt, translateConstTR) {

        // add translation table
        $translateProvider
            // add translation tables
            .translations('en', translateConstEn)
            .translations('de', translateConstDe)            
            .translations('it', translateConstIt)
            .translations('tr', translateConstTR)
            .preferredLanguage('en')
       
            // remember language
            .registerAvailableLanguageKeys(['en', 'de', 'it', 'tr'], {
                'en_US': 'en',
                'en_UK': 'en',
                'it_IT': 'it',
                'de_DE': 'de',
                'tr_TR': 'tr'
            });            
    }]);
