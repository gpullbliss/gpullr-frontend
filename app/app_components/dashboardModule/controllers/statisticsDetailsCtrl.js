'use strict';

angular.module('dashboardModule')
    .controller('statisticsDetailsCtrl', ['$scope', '$state', 'statisticsService', 'UserNameService', '$filter', function ($scope, $state, statisticsService, userNameService, $filter) {

        var currentPeriod = $state.current.data.period;

        $scope.getName = userNameService.getName;
        $scope.podium = {};

        statisticsService.getRankingList(currentPeriod).then(function (items) {
            $scope.rankingList = items;

            // ASSUME SORTED INPUT; BACKEND PROVIDES
            angular.forEach(items, function (rankListItem) {
                if (rankListItem.rank > 3){
                    return;
                }
                if (this[rankListItem.rank] == undefined){
                    this[rankListItem.rank] = [];
                }
                this[rankListItem.rank].push(rankListItem.user);
            }, $scope.podium);
        });
    }
]);
