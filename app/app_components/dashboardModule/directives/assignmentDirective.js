'use strict';

angular.module('dashboardModule')
    .directive('dvbAssignment', function () {
        return {
            scope: {
                pullRequest: '=',
                loggedInUser: '='
            },
            restrict: 'A',
            controller:
                ['$scope', 'PullRequestService', 'UserNameService', function ($scope, pullRequestService, userNameService) {
                var ACTION_ASSIGN_TO_ME = 'assignToMe',
                    ACTION_UNASSIGN_ME = 'unassignMe',
                    ACTION_CONFIRM_ASSIGN_TO_ME = 'confirmAssignToMe',
                    ACTION_OPEN_MODAL = 'modal',
                    currentPr,
                    defaultTitle = 'Assign myself';
                $scope.getName = userNameService.getName;
                function init() {
                    if (!$scope.pullRequest.assignee) {
                        $scope.assignTitle= defaultTitle;
                        $scope.assignment = ACTION_ASSIGN_TO_ME;
                        $scope.assignmentStyle = '';
                        $scope.assignmentModal = '';
                    } else if ($scope.pullRequest.assignee.id === $scope.loggedInUser.id) {
                        $scope.assignTitle= 'Unassign myself';
                        $scope.assignment = ACTION_UNASSIGN_ME;
                        $scope.assignmentStyle = 'isAssignedToMe';
                        $scope.assignmentModal = '';
                    } else {
                        $scope.assignTitle= defaultTitle;
                        $scope.assignment = ACTION_CONFIRM_ASSIGN_TO_ME;
                        $scope.assignmentStyle = 'isAssigned';
                        $scope.assignmentModal = ACTION_OPEN_MODAL;
                    }
                }
                
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
                init();
            }],
            templateUrl: 'app_components/dashboardModule/views/assignment.html'
        };
});