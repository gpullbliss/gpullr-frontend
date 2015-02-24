'use strict';
angular.module('loginModule')
    /*jshint maxparams:false */
    .controller('loginCtrl',
    ['$scope', '$location', 'userService', 'LOCATION_DASHBOARD', function ($scope, $location, userService, LOCATION_DASHBOARD) {
        userService.getUsersForLogin().then(function (users) {
            $scope.users = users;
        });

        $scope.submit = function (selectedUser) {
            userService.logInUser(selectedUser).then(function () {
                $location.path(LOCATION_DASHBOARD);
            }, function (error) {
                $scope.errorMessage = error;
            });
        };
    }]);
