'use strict';
angular.module('loginModule')
    .controller('githubOauthCtrl',
    /* jshint maxparams:false */
    ['$scope', '$state', '$stateParams', '$cookieStore', 'userService', 'STATE_DASHBOARD', 'STATE_LOGIN',
        function ($scope, $state, $stateParams, $cookieStore, userService, STATE_DASHBOARD, STATE_LOGIN) {
            var cookieState = $cookieStore.get('state');
            $cookieStore.remove('state');

            if (typeof(cookieState) === 'undefined') {
                $scope.errorState = true;
            } else if (cookieState !== $stateParams.state) {
                $scope.errorState = true;
            } else {
                $scope.errorState = false;
                console.log('foo');
                userService.authenticateWithGithubAndLogInUser($stateParams.code).then(
                    function () {
                        $state.go(STATE_DASHBOARD);
                    }, function (error) {
                        $scope.errorMessage = error;
                        $state.go(STATE_LOGIN);
                    }
                );
            }

        }]);
