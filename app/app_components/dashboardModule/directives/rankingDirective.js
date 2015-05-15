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
            controller: ['$scope', 'userService', function ($scope, userService) {
                $scope.getName = userService.getName;
            }],
            templateUrl: 'app_components/dashboardModule/views/rankingList.html'
        };
    });
