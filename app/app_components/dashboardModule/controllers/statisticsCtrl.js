'use strict';

angular.module('dashboardModule')
    .controller('statisticsCtrl', ['$scope', function ($scope) {
        $scope.tabs = [
            {state: 'stats.today', title: 'ranking.tabs.day'},
            {state: 'stats.last_7_days', title: 'ranking.tabs.week'},
            {state: 'stats.last_30_days', title: 'ranking.tabs.month'},
            {state: 'stats.all_time', title: 'ranking.tabs.allTime'}
        ];
    }]);
