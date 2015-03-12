'use strict';

angular.module('dashboardModule')
       .controller('statisticsDetailsCtrl', ['$scope', 'statisticsService', '$state', function($scope, statisticsService, $state) {

        var currentPeriod = $state.current.data.period;
        
        statisticsService.getRankingList(currentPeriod).then(function (items) {
            $scope.rankingList = items;
        });
}]);