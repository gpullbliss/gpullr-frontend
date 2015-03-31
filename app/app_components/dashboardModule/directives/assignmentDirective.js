'use strict';

angular.module('dashboardModule')
    .directive('assignment', function () {
        return {
            scope: {
                pullRequest: '=',
                loggedInUser: '='
            },
            restrict: 'E',
            controller: function ($scope, pullRequestService) {
                var ACTION_ASSIGN_TO_ME = 'assignToMe',
                    ACTION_UNASSIGN_ME = 'unassignMe',
                    ACTION_CONFIRM_ASSIGN_TO_ME = 'confirmAassignToMe',
                    currentPr = 'undefined',
                    defaultTitle = 'Assign myself';
                 
                function init() {
                    if ($scope.pullRequest.assignee === null) {
                        $scope.assignTitle= defaultTitle;
                        $scope.assignment = ACTION_ASSIGN_TO_ME;
                        $scope.assignmentStyle = '';
                    } else if ($scope.pullRequest.assignee.id === $scope.loggedInUser.id) {
                        $scope.assignTitle= 'Unassign myself';
                        $scope.assignment = ACTION_UNASSIGN_ME;
                        $scope.assignmentStyle = 'isAssignedToMe';
                    } else {
                        $scope.assignTitle= defaultTitle;
                        $scope.assignment = ACTION_CONFIRM_ASSIGN_TO_ME;
                        $scope.assignmentStyle = 'isAssigned';
                    }
                };
                
                $scope.assignmentAction = function (selectedPr, action) {
                    currentPr = selectedPr;
                    switch (action) {
                        case ACTION_ASSIGN_TO_ME:
                            pullRequestService.assignPullRequest(currentPr.id);
                            break;
                        case ACTION_CONFIRM_ASSIGN_TO_ME:
                            $scope.modalShown = true;
                            break;
                        case ACTION_UNASSIGN_ME:
                            pullRequestService.unassignPullRequest(currentPr.id);
                            break;
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
                init();
            },
            templateUrl: 'app_components/dashboardModule/views/assignment.html'
        };
});