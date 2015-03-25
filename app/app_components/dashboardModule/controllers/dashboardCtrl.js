'use strict';

angular.module('dashboardModule')
    /* jshint maxparams: false */
    .controller('dashboardCtrl', ['$scope', '$rootScope', '$interval', 'pullRequestService', 'userSettingsService',
        function ($scope, $rootScope, $interval, pullRequestService, userSettingsService) {

            var updatePullRequestsInterval;

            function getPullRequests() {
                pullRequestService.getPullRequests().then(function (pullRequests) {
                    $scope.pullRequests = pullRequests;
                    $rootScope.$emit('changeRequestCount', pullRequests.length);
                });
            }

            $scope.$on('$destroy', function () {
                    $interval.cancel(updatePullRequestsInterval);
                    updatePullRequestsInterval = undefined;
                }
            );

            $rootScope.$on('changeAssignee', function () {
                getPullRequests();
            });

            $scope.orderPrList = function (sortOrder) {
                var user = angular.copy($rootScope.user);
                if (user.userSettingsDto === null) {
                    user.userSettingsDto = {
                        orderOptionDto: sortOrder
                    };
                } else {
                    user.userSettingsDto.orderOptionDto = sortOrder;
                }
                userSettingsService.persistUserSettings(user).then(function () {
                    getPullRequests();
                });
            };
            
            updatePullRequestsInterval = $interval(getPullRequests, 60000);
            getPullRequests();
        }
    ]
);
