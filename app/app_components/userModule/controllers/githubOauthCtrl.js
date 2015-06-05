'use strict';
angular.module('userModule')
    .controller('githubOauthCtrl',
    ['$scope', '$state', '$stateParams', '$cookies', 'userService', 'notificationService', 'STATE_DASHBOARD',
        function ($scope, $state, $stateParams, $cookies, userService, notificationService, STATE_DASHBOARD) {
            var cookieState = $cookies.get('state');
            $cookies.remove('state');

            if (typeof(cookieState) === 'undefined') {
                $scope.errorState = true;
            } else if (cookieState !== $stateParams.state) {
                $scope.errorState = true;
            } else {
                $scope.errorState = false;
                userService.authenticateWithGithubAndLogInUser($stateParams.code).then(
                    function () {
                        // start polling after login: cookie available --> no 403 errors
                        notificationService.startPolling();
                        $state.go(STATE_DASHBOARD);
                    }, function () {
                        $scope.errorState = true;
                    }
                );
            }
        }]);
