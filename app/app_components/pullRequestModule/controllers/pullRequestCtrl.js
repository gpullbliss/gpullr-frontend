'use strict';

angular.module('pullRequestModule')
    .controller('pullRequestCtrl', ['$rootScope', '$scope', 'userService', 'PullRequestService', 'PullRequestCssClassService',
        function ($rootScope, $scope, userService, pullRequestService, pullRequestCssClassService) {

            $scope.getName = userService.getName;
            $scope.getColorClassDependingOnAge = pullRequestCssClassService.getColorClassDependingOnAge;
            $scope.getAbbreviateLines = pullRequestService.getAbbreviateLines;

            var ACTION_ASSIGN_TO_ME = 'assignToMe',
                ACTION_UNASSIGN_ME = 'unassignMe',
                ACTION_CONFIRM_ASSIGN_TO_ME = 'confirmAssignToMe',
                ACTION_OPEN_MODAL = 'modal',
                defaultTitle = 'dashboard.pullRequest.assign.toMe';

            function determineAction(pullRequest) {
                if (!pullRequest.assignee && pullRequest.elders.length === 0) {
                    $scope.assignTitle = defaultTitle;
                    return ACTION_ASSIGN_TO_ME;
                } else if (!pullRequest.assignee && pullRequest.elders.length > 0) {
                    $scope.assignTitle = defaultTitle;
                    $scope.elderCheckModal = ACTION_OPEN_MODAL;
                    return ACTION_CONFIRM_ASSIGN_TO_ME;
                } else if (pullRequest.assignee.id === $rootScope.user.id) {
                    $scope.assignTitle = 'dashboard.pullRequest.assign.unassign';
                    return ACTION_UNASSIGN_ME;
                } else {
                    $scope.assignTitle = defaultTitle;
                    $scope.assignmentModal = ACTION_OPEN_MODAL;
                    return ACTION_CONFIRM_ASSIGN_TO_ME;
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
                        pullRequestService.assignPullRequest(selectedPr.id);
                        break;
                    case ACTION_CONFIRM_ASSIGN_TO_ME:
                        console.log('confirm to assign PR "' + selectedPr.title + '" please');
                        angular.element('#override-assignee-modal').modal('show');
                        break;
                    case ACTION_UNASSIGN_ME:
                        pullRequestService.unassignPullRequest(selectedPr.id);
                        break;
                }
            };

            $scope.confirmAssignment = function (selectedPr) {
                pullRequestService.assignPullRequest(selectedPr.id);
            };

            $scope.confirmOtherAssignment = function (selectedPr) {
                pullRequestService.assignPullRequest(selectedPr.id);
            };

        }]
);