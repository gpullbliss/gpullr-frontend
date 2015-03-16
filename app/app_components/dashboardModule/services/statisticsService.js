'use strict';
angular.module('dashboardModule')
    .factory('statisticsService', ['$http', function ($http) {
        function getRankingList(rankingScope) {
            return $http.get('/api/rankings?rankingScope=' + rankingScope).then(
                function (response) {
                    return response.data.items;
                }
            );
        }

        return {
            getRankingList: getRankingList
        };
    }]);
