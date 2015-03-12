'use strict';

angular.module('dashboardModule')
    .directive('rankingList', function () {
        return {
            replace: true,
            scope: {
                ranking: '=rankdata'
            },
            restrict: 'E',
            templateUrl: 'app_components/dashboardModule/views/rankingList.html'
        };
    });
