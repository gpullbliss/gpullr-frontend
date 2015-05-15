'use strict';
angular.module('translateModule')
    .controller('translateCtrl', ['$scope', '$translate', 'amMoment', function ($scope, $translate, amMoment) {

        // change language
        $scope.changeLanguage = function (langKey) {
            $translate.use(langKey);
            amMoment.changeLocale(langKey + '-short');
        };

    }]
);
