'use strict';
angular.module('dashboardModule')
    .controller('dashboardCtrl', ['$scope', '$rootScope', '$interval', 'pullRequestService', function ($scope, $rootScope, $interval, pullRequestService) {
        var updatePullRequestsInterval,
            getPullRequests;
        
        getPullRequests = function () {
            pullRequestService.getPullRequests().then(function (pullRequests) {
                $scope.pullRequests = pullRequests;
                $rootScope.$emit('changeRequestCount', pullRequests.length);
            });
        };

        getPullRequests();

        updatePullRequestsInterval = $interval(getPullRequests, 60000);
        
        $scope.$on('$destroy', function () {
                $interval.cancel(updatePullRequestsInterval);
                updatePullRequestsInterval = undefined;
            }
        );

        $rootScope.$on('changeAssignee', function () {
            getPullRequests();
        });
    }]);
