'use strict';
angular.module('dashboardModule')
    .constant('STATE_STATS', 'stats')
    .constant('STATE_STATS_TODAY', 'stats.today')

    .config([
        '$stateProvider', 'STATE_STATS', 'STATE_STATS_TODAY',
        function ($stateProvider, STATE_STATS, STATE_STATS_TODAY) {
            $stateProvider
                .state(STATE_STATS, {
                    parent: 'page',
                    controller: 'statisticsCtrl',
                    templateUrl: 'app_components/dashboardModule/views/statistics.html',
                    url: '/stats'
                })
                .state(STATE_STATS_TODAY, {
                    data: {period: 'today'},
                    controller: 'statisticsDetailsCtrl',
                    templateUrl: 'app_components/dashboardModule/views/statisticsDetails.html',
                    url: '/today'
                })
                .state('stats.last_7_days', {
                    data: {period: 'last_7_days'},
                    controller: 'statisticsDetailsCtrl',
                    templateUrl: 'app_components/dashboardModule/views/statisticsDetails.html',
                    url: '/last-7-days'
                })
                .state('stats.last_30_days', {
                    data: {period: 'last_30_days'},
                    controller: 'statisticsDetailsCtrl',
                    templateUrl: 'app_components/dashboardModule/views/statisticsDetails.html',
                    url: '/last-30-days'
                })
                .state('stats.all_time', {
                    data: {period: 'all_time'},
                    controller: 'statisticsDetailsCtrl',
                    templateUrl: 'app_components/dashboardModule/views/statisticsDetails.html',
                    url: '/all-time'
                });
        }]
);
