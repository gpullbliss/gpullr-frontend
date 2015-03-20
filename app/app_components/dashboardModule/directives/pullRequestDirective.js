'use strict';

angular.module('dashboardModule')
.directive('pullRequest', function (pullRequestCssClassService) {
    return {
        scope: {
            pr: '=prdata'
        },
        restrict: 'E',
        controller: function ($scope, pullRequestService) {
            var currentPr = 'undefined';
            $scope.assignToMe = function (selectedPr) {
                currentPr = selectedPr;
                if (currentPr.assignee === null) {
                    pullRequestService.assignPullRequest(currentPr.id);
                } else {
                    $scope.modalShown = true;
                }
            };
            
            $scope.confirmAssignment = function () {
                pullRequestService.assignPullRequest(currentPr.id);
                currentPr = 'undefined';
                $scope.modalShown = false;
            };
        
            $scope.abortAssignment = function () {
                currentPr = 'undefined';
                $scope.modalShown = false;
            };
        
            $scope.modalClose = function () {
                $scope.modalShown = false;
            };
        },
        templateUrl: 'app_components/dashboardModule/views/pullRequest.html',
        link: function(scope, element) {
            console.log(pullRequestCssClassService);
            var colorClass = pullRequestCssClassService.getColorClassDependingOnAge(scope.pr.createdAt);
            element.addClass(colorClass);
        }
    };
});
