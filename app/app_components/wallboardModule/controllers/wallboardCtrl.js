'use strict';
angular.module('wallboardModule')
    .controller('wallboardCtrl', ['$scope', '$rootScope', '$interval', 'pullRequestService', function ($scope, $rootScope, $interval, pullRequestService) {
        var updatePullRequestsInterval,
            getPullRequests;

        getPullRequests = function () {
            pullRequestService.getPullRequests().then(function (pullRequests) {
                var assignedPullRequests = [],
                    unassignedPullRequests = [];

                angular.forEach(pullRequests, function (pullRequest) {
                    if (angular.isObject(pullRequest.assignee)) {
                        assignedPullRequests.push(pullRequest);
                    } else {
                        unassignedPullRequests.push(pullRequest);
                    }
                });

                $scope.assignedPullRequests = assignedPullRequests;
                $scope.unassignedPullRequests = unassignedPullRequests;
            });
        };

        getPullRequests();

        updatePullRequestsInterval = $interval(getPullRequests, 60000);

        $scope.$on('$destroy', function () {
                $interval.cancel(updatePullRequestsInterval);
                updatePullRequestsInterval = undefined;
            }
        );

        $rootScope.bodyClass = 'dark';
    }]);
