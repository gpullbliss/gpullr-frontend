'use strict';
angular.module('dashboardModule')
    .factory('pullRequestService', ['$http', 'ErrorResponseHandler', function ($http, ErrorResponseHandler) {
        function getPullRequests() {
            return $http.get('/api/pulls').then(
                function (response) {
                    return response.data.items;
                }, function (error) {
                    throw error.status + ': ' + error.data;
                }
            );
        }
        
        function assignPullRequest(prId) {
            var successfulResponseStatus = 204;
            $http.post('/api/pulls/' + prId, '').then(
                function (response) {
                    if (response.status === successfulResponseStatus) {
                        return true;
                    }
                }, function (error) {
                    ErrorResponseHandler.log(error);
                });
        }

        return {
            getPullRequests: getPullRequests,
            assignPullRequest: assignPullRequest
        };
    }]);
