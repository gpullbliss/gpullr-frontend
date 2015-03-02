'use strict';
angular.module('dashboardModule')
    .controller('dashboardCtrl', ['$scope', '$rootScope', '$interval', 'pullRequestService', function ($scope, $rootScope, $interval, pullRequestService) {
        var updatePullRequestsInterval,
            currentRepo,
            getPullRequests;
        $scope.modalShown = false;
        
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

        $scope.assignMe = function (selectedPr) {
            currentRepo = selectedPr;
            if (selectedPr.assignee === null) {
                pullRequestService.assignPullRequest(selectedPr.id);
            } else {
                $scope.modalShown = true;
            }
        };
        
        $scope.confirmAssignment = function () {
            pullRequestService.assignPullRequest(currentRepo.id);
            currentRepo = 'undefined';
            $scope.modalShown = false;
        };
        
        $scope.abortAssignment = function () {
            currentRepo = 'undefined';
            $scope.modalShown = false;
        };
        
        $scope.modalClose = function () {
            $scope.modalShown = false;
        };
        
    }]);
