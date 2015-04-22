'use strict';
angular.module('gpullr')
    .controller('translateCtrl', ['$scope', '$translate', function ($scope, $translate) {

        // change language
        $scope.changeLanguage = function (langKey) {
            $translate.use(langKey);
        };

    }]);
