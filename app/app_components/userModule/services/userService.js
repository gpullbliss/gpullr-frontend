'use strict';
angular.module('userModule')
    .factory('userService', ['$cacheFactory', '$http', '$rootScope', '$translate', 'amMoment',
        function ($cacheFactory, $http, $rootScope, $translate, amMoment) {

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
                    amMoment.changeLocale(userSettings.language + '-short');
                }
            }

            function authenticateWithGithubAndLogInUser(code) {
                return $http.post('/api/users/oauth/github/' + code, '');
            }

            function clearCacheForGetCurrentUser() {
                $cacheFactory.get('$http').remove('/api/users/me');
            }

            function getName(user) {
                return user.fullName ? user.fullName : user.username;
            }

            return {
                getCurrentUser: getCurrentUser,
                authenticateWithGithubAndLogInUser: authenticateWithGithubAndLogInUser,
                getLanguages: getLanguages,
                getName: getName,

                clearCacheForGetCurrentUser: clearCacheForGetCurrentUser
            };
        }]
);
