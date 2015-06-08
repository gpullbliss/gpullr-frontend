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

        function isAssigned(pullRequest) {
            return (pullRequest.assignee !== null);
        }

        function iAmAuthor(pullRequest) {
            return pullRequest.author.id === $rootScope.user.id;
        }

        function enhanceEachWithListOfElderPullRequests(pullRequest, allPullRequests) {
            if (isAssigned(pullRequest)) {
                return;
            }

            pullRequest.elders = [];

            var length = allPullRequests.length;
            for (var i = 0; i < length; i++) {
                var otherPullRequest = allPullRequests[i];

                if (isAssigned(otherPullRequest) || iAmAuthor(otherPullRequest)) {
                    continue;
                }

                if (Date.parse(pullRequest.createdAt) > Date.parse(otherPullRequest.createdAt)) {
                    // this produces a dependency tree from current "pullRequest" to the oldest one
                    // because "otherPullRequest" is pushed to the array by reference
                    pullRequest.elders.push(otherPullRequest);
                }
            }
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

                    var length = pullRequests.length;
                    for (var i = 0; i < length; i++) {
                        enhanceEachWithListOfElderPullRequests(pullRequests[i], pullRequests);
                    }

                    return pullRequests;
                }
            );
        }
        function getAbbreviateLines(lines) {
            return  lines < 999 ? lines : (lines/1000).toFixed(0) + 'k' ;
        }

        return {
            assignPullRequest: assignPullRequest,
            unassignPullRequest: unassignPullRequest,
            getPullRequests: getPullRequests,
            getAbbreviateLines: getAbbreviateLines
        };
    }]);
