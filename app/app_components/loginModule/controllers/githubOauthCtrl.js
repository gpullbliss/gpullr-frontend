'use strict';
angular.module('loginModule')
    .controller('githubOauthCtrl',
    ['$scope', '$state', '$stateParams', '$cookieStore', 'userService', 'STATE_DASHBOARD',
        function ($scope, $state, $stateParams, $cookieStore, userService, STATE_DASHBOARD) {
            var cookieState = $cookieStore.get('state');
            $cookieStore.remove('state');

            if (typeof(cookieState) === 'undefined') {
                $scope.errorState = true;
            } else if (cookieState !== $stateParams.state) {
                $scope.errorState = true;
            } else {
                $scope.errorState = false;
                userService.authenticateWithGithubAndLogInUser($stateParams.code).then(
                    function () {
                        $state.go(STATE_DASHBOARD);
                    }, function () {
                        $scope.errorState = true;
                    }
                );

            }

        }]);
