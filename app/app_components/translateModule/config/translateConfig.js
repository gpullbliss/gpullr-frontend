'use strict';
angular.module('translateModule')
    .config(['$translateProvider', 'TranslateConstEn', 'TranslateConstDe', function ($translateProvider, translateConstEn, translateConstDe) {
        //console.log(userSettingsModule);

        // add translation table
        $translateProvider
            // add translation tables
            .translations('en', translateConstEn)
            .translations('de', translateConstDe)
            .preferredLanguage('en')
            // remember language
            .registerAvailableLanguageKeys(['en', 'de'], {
                'en_US': 'en',
                'en_UK': 'en',
                'de_DE': 'de'
            });
    }]);
