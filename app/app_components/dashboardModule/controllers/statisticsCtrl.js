'use strict';

angular.module('dashboardModule')
    .controller('statisticsCtrl', ['$scope', '$state', function ($scope, $state) {
        $scope.tabs = [
            {state: 'stats.today', title: 'Day'},
            {state: 'stats.last_7_days', title: 'Week'},
            {state: 'stats.last_30_days', title: 'Month'},
            {state: 'stats.all_time', title: 'All time'}
        ];
        $state.go('stats.today');
    }]);