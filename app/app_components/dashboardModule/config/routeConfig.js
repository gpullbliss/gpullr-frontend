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
                    templateUrl: 'app_components/dashboardModule/views/dashboard.html',
                    url: '/'
                })
                .state(STATE_STATS, {
                    parent: 'page',
                    controller: 'statisticsCtrl',
                    templateUrl: 'app_components/dashboardModule/views/statistics.html',
                    url: '/stats'
                });
        }]);