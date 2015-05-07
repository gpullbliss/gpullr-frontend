'use strict';
angular.module('translateModule')
    .config(['$translateProvider', 'TranslateConstEn', 'TranslateConstEs', 'TranslateConstDe', 'TranslateConstIt', 'TranslateConstRu', 'TranslateConstTr', 'TranslateConstPl', 'TranslateConstVmf',
        function ($translateProvider ,translateConstEn, translateConstEs, translateConstDe, translateConstIt, translateConstRu, translateConstTr, translateConstPl, translateConstVmf) {
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
            .translations('vmf', translateConstVmf)
            .preferredLanguage('en')
            // add relations
            .registerAvailableLanguageKeys(['en', 'de', 'it', 'pl', 'ru', 'tr', 'vmf'], {
                'de_AT': 'de',
                'de_CH': 'de',
                'de_DE': 'de',
                'en_UK': 'en',
                'en_US': 'en',
                'es_ES': 'es',
                'it_IT': 'it',
                'ru_RU': 'ru',
                'tr_TR': 'tr',
                'pl_PL': 'pl',
                'vmf': 'vmf'
            });
            $translateProvider.useSanitizeValueStrategy('escaped');
    }]);