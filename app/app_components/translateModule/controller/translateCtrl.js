'use strict';
angular.module('translateModule')
    .controller('translateCtrl', ['$scope', '$translate', function ($scope, $translate) {

        // change language
        $scope.changeLanguage = function (langKey) {
            $translate.use(langKey);
        };

    }]);
