'use strict';

angular.module('dashboardModule')
    /* jshint maxparams: false */
    .controller('dashboardCtrl', ['$scope', '$rootScope', '$interval', 'PullRequestService', 'userSettingsService',
        function ($scope, $rootScope, $interval, pullRequestService, userSettingsService) {

            var updatePullRequestsInterval;

            function getPullRequests() {
                pullRequestService.getPullRequests().then(function (pullRequests) {
                    $scope.pullRequests = pullRequests;
                    $rootScope.$emit('changeRequestCount', pullRequests.length);
                });
            }

            function orderPrList(selector, sortOrder) {
                var user = angular.copy($rootScope.user);

                if (user.userSettingsDto === null) {
                    user.userSettingsDto = {};
                }

                user.userSettingsDto[selector] = sortOrder;
                userSettingsService.persistUserSettings(user);
            }

            $scope.$on('$destroy', function () {
                    $interval.cancel(updatePullRequestsInterval);
                    updatePullRequestsInterval = undefined;
                }
            );

            $rootScope.$on('changeAssignee', function () {
                getPullRequests();
            });


            $scope.orderUnassignedPrList = function (sortOrder) {
                orderPrList('unassignedPullRequestsOrdering', sortOrder);
            };

            $scope.orderAssignedPrList = function (sortOrder) {
                orderPrList('assignedPullRequestsOrdering', sortOrder);
            };

            updatePullRequestsInterval = $interval(getPullRequests, 60000);
            getPullRequests();
        }
    ]
);
