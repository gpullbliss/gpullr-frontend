'use strict';
angular.module('loginModule')
    .factory('userService', ['$cacheFactory', '$http', '$rootScope', function ($cacheFactory, $http, $rootScope) {
        function getCurrentUser(byPassCache) {
            var config = {cache: true};

            if (byPassCache === true) {
                console.debug('getCurrentUser force refresh WITHOUT CACHE');
                config.cache = false;
            }

            return $http.get('/api/users/me', config).then(
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
