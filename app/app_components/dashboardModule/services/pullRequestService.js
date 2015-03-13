'use strict';
angular.module('dashboardModule')
    .factory('pullRequestService', ['$http', '$rootScope', function ($http, $rootScope) {
        function assignPullRequest(prId) {
            return $http.post('/api/pulls/' + prId, '').then(
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
            getPullRequests: getPullRequests
        };
    }]);
