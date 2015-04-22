'use strict';
angular.module('gpullr')
    .config(['$translateProvider', 'TranslateConstEn', 'TranslateConstDe', function ($translateProvider, translateConstEn, translateConstDe) {

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
            /*.determinePreferredLanguage() <- removed until german translation is working */
            // add custom error handler
    }]);
