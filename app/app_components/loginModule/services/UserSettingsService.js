'use strict';

angular.module('loginModule')
    .service('UserSettingsService', ['$http', function ($http) {

        function persistOrderSettings(user) {
            return $http.put('/api/users/' + user.id + '/settings', user.userSettingsDto);
        }

        return {
            persistOrderSettings: persistOrderSettings
        };

    }]
);