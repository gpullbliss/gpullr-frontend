'use strict';

angular.module('dashboardModule')
    .controller('statisticsCtrl', ['$scope', '$state', function ($scope, $state) {
        var
        $scope.assignmentAction = function (selectedPr, action) {
            currentPr = selectedPr;
            switch (action) {
                case ACTION_ASSIGN_TO_ME:
                    pullRequestService.assignPullRequest(currentPr.id);
                    break;
                case ACTION_CONFIRM_ASSIGN_TO_ME:
                    break;
                case ACTION_UNASSIGN_ME:
                    pullRequestService.unassignPullRequest(currentPr.id);
                    break;
            }
        };

        $scope.confirmAssignment = function () {
            pullRequestService.assignPullRequest(currentPr.id);
        };

        $scope.confirmOtherAssignment = function (selectedPr) {
            currentPr = selectedPr;
            pullRequestService.assignPullRequest(currentPr.id);
        };
    }]);