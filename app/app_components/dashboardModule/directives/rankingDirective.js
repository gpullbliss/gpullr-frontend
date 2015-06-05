'use strict';

angular.module('dashboardModule')
    .directive('dvbRankingList', function () {
        return {
            replace: true,
            scope: {
                ranking: '=rankdata',
                user: '=userdata'
            },
            restrict: 'A',
            controller: ['$scope', 'userService', 'pullRequestService', function ($scope, userService, pullRequestService) {
                $scope.getName = userService.getName;
                $scope.getAbbreviateLines = pullRequestService.getAbbreviateLines;
            }],
            templateUrl: 'app_components/dashboardModule/views/rankingList.html'
        };
    });
