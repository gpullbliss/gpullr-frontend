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
            return $http.post('/api/pulls/' + prId, '').then(
                function () {
                        $rootScope.$emit('changeAssignee');
                        return true;
                }, function (error) {
                    ErrorResponseHandler.log(error.data);
                });
        }

        return {
            getPullRequests: getPullRequests,
            assignPullRequest: assignPullRequest
        };
    }]);
