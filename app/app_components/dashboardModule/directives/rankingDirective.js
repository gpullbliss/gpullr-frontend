'use strict';

angular.module('dashboardModule')
    .directive('dvbRankingList', function () {
        return {
            replace: true,
            scope: {
                ranking: '=rankdata',
                user: '=userdata'
            },
            restrict: 'A',
            templateUrl: 'app_components/dashboardModule/views/rankingList.html'
        };
    });
