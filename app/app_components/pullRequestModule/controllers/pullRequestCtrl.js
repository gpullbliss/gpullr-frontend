'use strict';

angular.module('pullRequestModule')
    .controller('pullRequestCtrl', ['$rootScope', '$scope', 'userService', 'PullRequestService', 'PullRequestCssClassService',
        function ($rootScope, $scope, userService, pullRequestService, pullRequestCssClassService) {

            var ACTION_ASSIGN_TO_ME = 'assignToMe',
                ACTION_UNASSIGN_ME = 'unassignMe',
                ACTION_CONFIRM_ELDER = 'confirmElder',
                ACTION_CONFIRM_OVERRIDE_ASSIGNEE = 'confirmOverrideAssignee';

            $scope.getName = userService.getName;
            $scope.getColorClassDependingOnAge = pullRequestCssClassService.getColorClassDependingOnAge;
            $scope.getAbbreviateLines = pullRequestService.getAbbreviateLines;

            function determineAction(pullRequest) {
                if (!pullRequest.assignee && pullRequest.elders.length === 0) {
                    return ACTION_ASSIGN_TO_ME;
                } else if (!pullRequest.assignee && pullRequest.elders.length > 0) {
                    return ACTION_CONFIRM_ELDER;
                } else if (pullRequest.assignee.id === $rootScope.user.id) {
                    return ACTION_UNASSIGN_ME;
                } else {
                    return ACTION_CONFIRM_OVERRIDE_ASSIGNEE;
                }
            }

            $scope.getAssignmentStyle = function (pullRequest) {
                if (!pullRequest.assignee && pullRequest.elders.length === 0) {
                    return '';
                } else if (!pullRequest.assignee && pullRequest.elders.length > 0) {
                    return '';
                } else if (pullRequest.assignee.id === $rootScope.user.id) {
                    return 'isAssignedToMe';
                } else {
                    return 'isAssigned';
                }
            };

            $scope.assignmentAction = function (selectedPr) {
                var action = determineAction(selectedPr);

                switch (action) {
                    case ACTION_ASSIGN_TO_ME:
                        $scope.confirmAssignment(selectedPr);
                        break;
                    case ACTION_CONFIRM_ELDER:
                        $scope.selectedPullRequest = selectedPr;
                        $scope.elderPullRequests = selectedPr.elders;
                        angular.element('#confirm-elder-modal').modal('show');
                        break;
                    case ACTION_CONFIRM_OVERRIDE_ASSIGNEE:
                        $scope.selectedPullRequest = selectedPr;
                        angular.element('#override-assignee-modal').modal('show');
                        break;
                    case ACTION_UNASSIGN_ME:
                        pullRequestService.unassignPullRequest(selectedPr.id);
                        break;
                }
            };

            $scope.confirmAssignment = function (selectedPr) {
                // for whatever reason, this modal (and only this) won't close otherwise...
                angular.element('#confirm-elder-modal').modal('hide');

                // delete temporary vars
                $scope.elderPullRequests = null;
                $scope.selectedPullRequest = null;

                pullRequestService.assignPullRequest(selectedPr.id);
            };

        }]
);