'use strict';

angular.module('loginModule')
    .service('userSettingsService', ['$http', function ($http) {

        function persistUserSettings(user) {
            return $http.put('/api/users/' + user.id + '/settings', user.userSettingsDto);
        }

        return {
            persistUserSettings: persistUserSettings
        };

    }]
);