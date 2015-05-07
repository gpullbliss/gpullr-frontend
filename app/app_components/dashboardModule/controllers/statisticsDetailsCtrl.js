'use strict';

angular.module('dashboardModule')
    .controller('statisticsDetailsCtrl', ['$scope', '$state', 'statisticsService', 'UserNameService', function ($scope, $state, statisticsService, userNameService) {
        $scope.podium = {};
        $scope.rankingList = [];

        $scope.getName = function () {
            return userNameService.getName();
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
