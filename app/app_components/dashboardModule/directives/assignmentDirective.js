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
                //console.log($scope.pullRequest);  
                //console.log($scope.loggedInUser);
                
                var assignMeClass = 'assignMe ';
                 
                
                $scope.assigneeStyle = function () {
                    if ($scope.pullRequest.assignee === null) {
                        $scope.assignTitle='Assign myself';
                        $scope.assignment = 'assignToMe'
                        return assignMeClass;
                    } else if ($scope.pullRequest.assignee.id === $scope.loggedInUser.id) {
                        $scope.assignTitle='Unassign myself';
                        $scope.assignment = 'unassignMe'
                        return assignMeClass + 'isAssignedToMe';
                    } else {
                        $scope.assignTitle='Assign myself';
                        $scope.assignment = 'ConfirmAassignToMe'
                        return assignMeClass + 'isAssigned';
                    }
                };
                
                var currentPr = 'undefined';
                $scope.assignmentAction = function (selectedPr, action) {
                    currentPr = selectedPr;
                    switch (action) {
                        case 'assignToMe':
                    console.log('assignToMe');
                            pullRequestService.assignPullRequest(currentPr.id);
                            break;
                        case 'ConfirmAassignToMe':
                    console.log('ConfirmAssignToMe');
                            $scope.modalShown = true;
                            break;
                        case 'unassignMe':
                    console.log('unassignMe');
                            pullRequestService.unassignPullRequest(currentPr.id);
                            break;
                    }
                };
                
               /* $scope.assignToMe = function (selectedPr) {
                    currentPr = selectedPr;
                    if (currentPr.assignee === null) {
                        pullRequestService.assignPullRequest(currentPr.id);
                    } else {
                        $scope.modalShown = true;
                    }
                }; */

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
                
              /*  $scope.unassignMe = function (selectedPr) {
                    pullRequestService.unassignPullRequest(selectedPr.id);
                }; */
            },
            templateUrl: 'app_components/dashboardModule/views/assignment.html'
        };
});