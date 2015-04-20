'use strict';

angular.module('dashboardModule')
    .controller('statisticsDetailsCtrl', ['$scope', '$state', 'statisticsService', 'UserNameService', function ($scope, $state, statisticsService, userNameService) {

        var currentPeriod = $state.current.data.period;

        $scope.getName = userNameService.getName;

        statisticsService.getRankingList(currentPeriod).then(function (items) {
            $scope.rankingList = items;
        });
    }]);
