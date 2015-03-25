'use strict';

angular.module('dashboardModule')
    .directive('pullRequest', ['pullRequestCssClassService', function (pullRequestCssClassService) {
        return {
            scope: {
                pullRequest: '=',
                loggedInUser: '='
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
                
                $scope.unassignMe = function (selectedPr) {
                    pullRequestService.unassignPullRequest(selectedPr.id);
                };
            },
            templateUrl: 'app_components/dashboardModule/views/pullRequest.html',
            link: function (scope, element) {
                var colorClass = pullRequestCssClassService.getColorClassDependingOnAge(scope.pullRequest.createdAt);
                element.addClass(colorClass);
            }
        };
    }]);
