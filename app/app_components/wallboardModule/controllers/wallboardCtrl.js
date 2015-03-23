'use strict';
angular.module('wallboardModule')
    /* jshint maxparams:false */
    .controller('wallboardCtrl', ['$scope', '$rootScope', '$interval', '$stateParams', '$timeout', '$window', 'pullRequestService',
        function ($scope, $rootScope, $interval, $stateParams, $timeout, $window, pullRequestService) {
            var updatePullRequestsInterval,
                getPullRequests,
                reloadApp,
                reloadAppTimeout,
                reposToInclude = [];

            if (angular.isString($stateParams.repos)) {
                reposToInclude = $stateParams.repos.split(';');
            }

            getPullRequests = function () {
                pullRequestService.getPullRequests(reposToInclude).then(function (pullRequests) {
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
