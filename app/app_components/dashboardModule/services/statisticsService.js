'use strict';
angular.module('dashboardModule')
    .factory('statisticsService', ['$http', 'ErrorResponseHandler', function ($http, ErrorResponseHandler) {
        function getRankingList(rankingScope) {
            var promise = $http.get('/api/rankings?rankingScope=' + rankingScope);
            
            return promise.then(
                function (response) {
                    return response.data.items;
                }, function (error) {
                    ErrorResponseHandler.log(error);
                }
            );
        }

        return {
            getRankingList: getRankingList
        };
    }]);
