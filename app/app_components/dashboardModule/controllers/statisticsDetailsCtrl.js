'use strict';

angular.module('dashboardModule')
    .controller('statisticsDetailsCtrl', ['$scope', '$state', 'statisticsService', function ($scope, $state, statisticsService) {

        var currentPeriod = $state.current.data.period;

        statisticsService.getRankingList(currentPeriod).then(function (items) {
            $scope.rankingList = items;
        });
    }]);
