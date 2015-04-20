'use strict';
angular.module('userSettingsModule')
    .factory('UserNameService', function () {
        function getName(user) {
            return user.fullName ? user.fullName : user.username;
        }
        return {
            getName: getName
        };
    });
