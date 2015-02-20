'use strict';
angular.module('headerModule')
    .factory('userService', ['$http', function ($http) {
        function whoAmI() {
            // so far for testing the loginCall must be made manually to check for fetching username works
            $http.post('/api/users/login/2143421');
            return $http.get('/api/users/me').then(
                function (response) {
                    return response.data;
                }, function (error) {
                    throw error.status + ': ' + error.data;
                }
            );
        }

        return {
            whoAmI: whoAmI
        };
    }]);