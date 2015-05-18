'use strict';
angular.module('pullRequestModule')
    .factory('PullRequestService', ['$http', '$rootScope', function ($http, $rootScope) {
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
                    var pullRequests = response.data.items;

                    pullRequests.forEach(function(pullRequest) {
                        if (pullRequest.assignee !== null) {
                            return;
                        }

                        pullRequest.hasOlder = [];

                        pullRequests.forEach(function (otherPullRequest) {
                            if (otherPullRequest.assignee !== null) {
                                return;
                            }

                            if (Date.parse(pullRequest.createdAt) > Date.parse(otherPullRequest.createdAt)) {
                                pullRequest.hasOlder.push(otherPullRequest);

                                console.log('>>'+pullRequest.title + '<< has older pr >>' + otherPullRequest.title + '<<');
                            }
                        });

                    });

                    return pullRequests;
                }
            );
        }

        return {
            assignPullRequest: assignPullRequest,
            unassignPullRequest: unassignPullRequest,
            getPullRequests: getPullRequests
        };
    }]);
