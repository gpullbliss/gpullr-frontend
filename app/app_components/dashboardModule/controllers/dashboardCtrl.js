'use strict';
angular.module('dashboardModule')
    .controller('dashboardCtrl', ['$scope', '$interval', 'pullRequestService', function ($scope, $interval, pullRequestService) {
        var updatePullRequestsInterval,
            getPullRequests;

        getPullRequests = function () {
            pullRequestService.getPullRequests()
                .then(function (pullRequests) {
                    $scope.pullRequests = pullRequests;
                });
        };

        getPullRequests();

        if (angular.isUndefined(updatePullRequestsInterval)) {
            updatePullRequestsInterval = $interval(getPullRequests, 60000);
        }

        $scope.$on('$destroy', function () {
                if (angular.isDefined(updatePullRequestsInterval)) {
                    $interval.cancel(updatePullRequestsInterval);
                    updatePullRequestsInterval = undefined;
                }
            }
        );
    }]);
