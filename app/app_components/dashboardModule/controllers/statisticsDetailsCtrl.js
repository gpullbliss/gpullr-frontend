'use strict';

angular.module('dashboardModule')
    .controller('statisticsDetailsCtrl', ['$scope', '$state', 'statisticsService', 'UserNameService', function ($scope, $state, statisticsService, UserNameService) {

        var currentPeriod = $state.current.data.period;

        $scope.getName = UserNameService.getName;

        statisticsService.getRankingList(currentPeriod).then(function (items) {
            $scope.rankingList = items;
        });
    }]);
