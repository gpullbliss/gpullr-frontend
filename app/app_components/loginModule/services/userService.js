'use strict';
angular.module('loginModule')
    /* jshint maxparams:false */
    .factory('userService', ['$http', '$state', 'ErrorResponseHandler', '$rootScope', 'STATE_LOGIN', function ($http, $state, ErrorResponseHandler, $rootScope, STATE_LOGIN) {
        function getUsersForLogin() {
            return $http.get('/api/users').then(
                function (response) {
                    return response.data;
                }, function (error) {
                    ErrorResponseHandler.log(error);
                }
            );
        }

        function logInUser(user) {
            var successfulResponseStatus = 201;

            return $http.post('/api/users/login/' + user.id, '').then(
                function (response) {
                    if (response.status === successfulResponseStatus) {
                        whoAmI();
                        return true;
                    } else {
                        throw 'Got response code ' + response.status + ' instead of ' + successfulResponseStatus;
                    }
                }, function (error) {
                    ErrorResponseHandler.log(error);
                }
            );
        }

        function whoAmI() {
            var promise = $http.get('/api/users/me');

            return promise.then(
                function (response) {
                    $rootScope.$emit('updateUser', response.data);
                }, function (error) {
                    $state.go(STATE_LOGIN);
                    ErrorResponseHandler.log(error);
                }
            );
        }

        return {
            getUsersForLogin: getUsersForLogin,
            logInUser: logInUser,
            whoAmI: whoAmI
        };
    }]);
