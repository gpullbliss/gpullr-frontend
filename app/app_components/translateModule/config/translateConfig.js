'use strict';
angular.module('translateModule')
    .config(['$translateProvider', 'TranslateConstEn', 'TranslateConstDe', 'TranslateConstIt', function ($translateProvider, translateConstEn, translateConstDe, translateConstIt) {

        // add translation table
        $translateProvider
            // add translation tables
            .translations('en', translateConstEn)
            .translations('de', translateConstDe)            
            .translations('it', translateConstIt)
            .preferredLanguage('en')
       
            // remember language
            .registerAvailableLanguageKeys(['en', 'de', 'it'], {
                'en_US': 'en',
                'en_UK': 'en',
                'it_IT': 'it',
                'de_DE': 'de'
            });            
    }]);
