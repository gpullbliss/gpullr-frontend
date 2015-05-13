'use strict';
angular.module('userModule')
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

            function getLanguages() {
                return $http.get('api/users/languages').then(
                    function (response) {
                        return response.data;
                    }
                );
            }

            // private methods
            function setUserLanguage(user) {
                var userSettings = user.userSettingsDto;
                if (userSettings && userSettings.language) {
                    $translate.use(userSettings.language);
                }
            }

            function authenticateWithGithubAndLogInUser(code) {
                return $http.post('/api/users/oauth/github/' + code, '');
            }

            function clearCacheForGetCurrentUser() {
                $cacheFactory.get('$http').remove('/api/users/me');
            }

            return {
                getCurrentUser: getCurrentUser,
                authenticateWithGithubAndLogInUser: authenticateWithGithubAndLogInUser,
                getLanguages: getLanguages,

                clearCacheForGetCurrentUser: clearCacheForGetCurrentUser
            };
        }]
);
