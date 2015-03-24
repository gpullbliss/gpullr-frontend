'use strict';
angular.module('pullRequestModule')
    .factory('pullRequestService', ['$http', '$rootScope', function ($http, $rootScope) {
        function assignPullRequest(prId) {
            return $http.post('/api/pulls/' + prId, '').then(
                function () {
                    $rootScope.$emit('changeAssignee');
                }
            );
        }
        
        function unassignPullRequest(prId) {
            return $http.put('/api/pulls/' + prId, '').then(
                function () {
                    $rootScope.$emit('changeAssignee');
                }
            );
        }

        function getPullRequests() {
            return $http.get('/api/pulls').then(
                function (response) {
                    return response.data.items;
                }
            );
        }

        return {
            assignPullRequest: assignPullRequest,
            unassignPullRequest: unassignPullRequest,
            getPullRequests: getPullRequests
        };
    }]);
