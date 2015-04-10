'use strict';

angular.module('loginModule')
    .service('userSettingsService', ['$http', 'userService', function ($http, userService) {

        function persistUserSettings(user) {
            return $http.put('/api/users/' + user.id + '/settings', user.userSettingsDto).then(
                function () {
                    userService.clearCacheForGetCurrentUser();
                    userService.getCurrentUser();
                });
        }

        return {
            persistUserSettings: persistUserSettings
        };

    }]
);