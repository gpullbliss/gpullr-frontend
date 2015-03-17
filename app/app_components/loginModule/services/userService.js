'use strict';
angular.module('loginModule')
    .factory('userService', ['$cacheFactory', '$http', '$rootScope', function ($cacheFactory, $http, $rootScope) {
        function getCurrentUser() {
            return $http.get('/api/users/me', {cache: true}).then(
                function (response) {
                    $rootScope.user = response.data;
                    return response.data;
                }
            );
        }

        function getUsersForLogin() {
            return $http.get('/api/users').then(
                function (response) {
                    return response.data;
                }
            );
        }

        function logInUser(user) {
            var successfulResponseStatus = 201;
            clearCacheForGetCurrentUser();

            return $http.post('/api/users/login/' + user.id, '').then(
                function (response) {
                    if (response.status !== successfulResponseStatus) {
                        throw 'Got response code ' + response.status + ' instead of ' + successfulResponseStatus;
                    } else {
                        getCurrentUser();
                    }
                }
            );
        }

        function clearCacheForGetCurrentUser() {
            $cacheFactory.get('$http').remove('/api/users/me');
        }

        return {
            getCurrentUser: getCurrentUser,
            getUsersForLogin: getUsersForLogin,
            logInUser: logInUser
        };
    }]);
