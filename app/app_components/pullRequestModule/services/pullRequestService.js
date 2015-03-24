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

        /**
         * @param {Array<string>=} reposToInclude
         * @returns {Array<Object>}
         */
        function getPullRequests(reposToInclude) {
            var url = '/api/pulls';

            if (Array.isArray(reposToInclude) && reposToInclude.length > 0) {
                url = url + '?repos=' + reposToInclude.join(';');
            }

            return $http.get(url).then(
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
