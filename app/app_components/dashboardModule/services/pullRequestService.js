'use strict';
angular.module('dashboardModule')
    .factory('pullRequestService', ['$http', function ($http) {
        function getPullRequests() {
            return $http.get('/api/pulls').then(
                function (response) {
                    return response.data;
                }, function (error) {
                    throw error.status + ': ' + error.data;
                }
            );
        }

        return {
            getPullRequests: getPullRequests
        };
    }]);
