'use strict';
angular.module('dashboardModule')
    .constant('STATE_DASHBOARD', 'dashboard')
    .constant('STATE_STATS', 'stats')
    .config([
        '$stateProvider', 'STATE_DASHBOARD', 'STATE_STATS', function ($stateProvider, STATE_DASHBOARD, STATE_STATS) {
            $stateProvider
                .state(STATE_DASHBOARD, {
                    parent: 'page',
                    controller: 'dashboardCtrl',
                    data: {requireLogin: true},
                    templateUrl: 'app_components/dashboardModule/views/dashboard.html',
                    url: '/'
                })
                .state(STATE_STATS, {
                    parent: 'page',
                    controller: 'statisticsCtrl',
                    templateUrl: 'app_components/dashboardModule/views/statistics.html',
                    url: '/stats'
                })
                .state('stats.today', {
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
        }]);
