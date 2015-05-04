'use strict';
angular.module('loginModule')
    .factory('userService', ['$cacheFactory', '$http', '$rootScope', '$translate',
        function ($cacheFactory, $http, $rootScope, $translate) {

            function getCurrentUser() {
                return $http.get('/api/users/me', {cache: true}).then(
                    function (response) {
                        $rootScope.user = response.data;
                        setUserLanguage($rootScope.user);

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

            function getLanguages() {
                return $http.get('api/users/languages').then(
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
                logInUser: logInUser,
                getLanguages: getLanguages,

                clearCacheForGetCurrentUser: clearCacheForGetCurrentUser
            };


            // private methods
            function setUserLanguage(user) {
                console.log('setting user configured language');
                var userSettings = user.userSettingsDto;
                if (userSettings && userSettings.language) {
                    $translate.use(userSettings.language);
                }
            }
        }]
);