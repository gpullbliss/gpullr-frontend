'use strict';

angular.module('loginModule')
    .service('UserSettingsService', ['$http', function ($http) {

      function persistOrderSettings() {

      }

      return {
        persistOrderSettings: persistOrderSettings
      };

    }]
);