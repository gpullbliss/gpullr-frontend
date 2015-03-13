'use strict';
angular.module('loginModule')
    .factory('userService', ['$http', '$state', '$rootScope', 'STATE_LOGIN', function ($http, $state, $rootScope, STATE_LOGIN) {
        function getUsersForLogin() {
            return $http.get('/api/users').then(
                function (response) {
                    return response.data;
                }
            );
        }

        function logInUser(user) {
            var successfulResponseStatus = 201;

            return $http.post('/api/users/login/' + user.id, '').then(
                function (response) {
                    if (response.status !== successfulResponseStatus) {
                        throw 'Got response code ' + response.status + ' instead of ' + successfulResponseStatus;
                    }
                }
            );
        }

        function whoAmI() {
            return $http.get('/api/users/me').then(
                function (response) {
                    $rootScope.$emit('updateUser', response.data);
                }, function () {
                    $state.go(STATE_LOGIN);
                    throw '';
                }
            );
        }

        return {
            getUsersForLogin: getUsersForLogin,
            logInUser: logInUser,
            whoAmI: whoAmI
        };
    }]);
