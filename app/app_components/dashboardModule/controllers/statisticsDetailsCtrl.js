'use strict';

angular.module('dashboardModule')
       .controller('statisticsDetailsCtrl', ['$scope', 'userService', '$state', function($scope, userService, $state) {

        var currentPeriod = $state.current.data.period;
        
        userService.getRankingList(currentPeriod).then(function (items) {
            $scope.rankingList = items;
        });
}]);