'use strict';
angular.module('loginModule')
    .factory('userService', ['$http', function ($http) {
        function getUsersForLogin() {
            return $http.get('/api/users').then(
                function (response) {
                    return response.data;
                }, function (error) {
                    throw error.status + ': ' + error.data;
                }
            );
        }

        function logInUser(user) {
            var successfulResponseStatus = 201;

            return $http.post('/api/users/login/' + user.id, '').then(
                function (response) {
                    if (response.status === successfulResponseStatus) {
                        return true;
                    } else {
                        throw 'Got response code ' + response.status + ' instead of ' + successfulResponseStatus;
                    }
                }, function (error) {
                    throw error.status + ': ' + error.data;
                }
            );
        }

        return {
            getUsersForLogin: getUsersForLogin,
            logInUser: logInUser
        };
    }]);
