'use strict';
angular.module('wallboardModule')
    /* jshint maxparams:false */
    .controller('wallboardCtrl', ['$scope', '$rootScope', '$interval', '$timeout', '$window', 'pullRequestService',
        function ($scope, $rootScope, $interval, $timeout, $window, pullRequestService) {
            var updatePullRequestsInterval,
                getPullRequests,
                reloadApp,
                reloadAppTimeout;

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
                }
            );

            reloadApp = function () {
                $window.location.reload();
            };

            reloadAppTimeout = $timeout(reloadApp, 1000 * 60 * 60 * 24);

            $scope.$on('$destroy', function () {
                    $timeout.cancel(reloadAppTimeout);
                }
            );

            $rootScope.bodyClass = 'dark';
        }]);
