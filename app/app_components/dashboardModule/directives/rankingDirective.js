'use strict';

angular.module('dashboardModule')
    .directive('rankingList', function () {
        return {
            replace: true,
            scope: {
                ranking: '=rankdata',
                user: '=userdata'
            },
            restrict: 'E',
            templateUrl: 'app_components/dashboardModule/views/rankingList.html'
        };
    });
