'use strict';

angular.module('dashboardModule')
    .controller('statisticsDetailsCtrl', ['$scope', '$state', 'statisticsService', 'userService', function ($scope, $state, statisticsService, userService) {
        $scope.podium = {};
        $scope.rankingList = [];

        $scope.getName = function (user) {
            return userService.getName(user);
        };

        function init() {
            var currentPeriod = $state.current.data.period;
            var extractFirstThreeRanks = function (rankedItems, podium) {
                // ASSUME SORTED INPUT; BACKEND PROVIDES IT
                angular.forEach(rankedItems, function (rankListItem) {
                    if (rankListItem.rank > 3) {
                        return;
                    }
                    if (this[rankListItem.rank] === undefined) {
                        this[rankListItem.rank] = [];
                    }
                    this[rankListItem.rank].push(rankListItem.user);
                }, podium);
            };


            statisticsService.getRankingList(currentPeriod).then(function (items) {
                $scope.rankingList = items;
                extractFirstThreeRanks(items, $scope.podium);
            });
        }

        init();
    }
]);
