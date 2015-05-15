'use strict';
angular.module('userModule')
    .controller('loginCtrl',
    ['$scope', '$state', '$cookieStore', 'envConfig', function ($scope, $state, $cookieStore, envConfig) {

        function getRandom() {
            var text = '';
            var possible = 'abcdefghijklmnopqrstuvwxyz0123456789';

            for (var i = 0; i < 42; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }

            return text;
        }

        var state = getRandom();
        $scope.state = state;
        $scope.githubClientId = envConfig.githubClientId;
        $cookieStore.put('state', state);
    }]);
