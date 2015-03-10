'use strict';
angular.module('loginModule')
    /* jshint maxparams:false */
    .controller('loginCtrl',
    ['$scope', '$state', 'userService', 'STATE_DASHBOARD', function ($scope, $state, userService, STATE_DASHBOARD) {
        userService.getUsersForLogin().then(function (users) {
            $scope.users = users;
        });

        $scope.submit = function (selectedUser) {
            userService.logInUser(selectedUser).then(function () {
                $state.go(STATE_DASHBOARD);
            }, function (error) {
                $scope.errorMessage = error;
            });
        };
    }]);
