'use strict';
angular.module('dashboardModule')
    .factory('pullRequestService', ['$http', 'ErrorResponseHandler', '$rootScope', function ($http, ErrorResponseHandler, $rootScope) {
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
            return $http.post('/api/pulls/' + prId, '').then(
                function (response) {
                    if (response.status === successfulResponseStatus) {
                        $rootScope.$emit('changeAssignee');
                        return true;
                    }
                }, function (error) {
                    ErrorResponseHandler.log(error.data);
                });
        }

        return {
            getPullRequests: getPullRequests,
            assignPullRequest: assignPullRequest
        };
    }]);
