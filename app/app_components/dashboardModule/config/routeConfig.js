'use strict';
angular.module('dashboardModule')
    .constant('STATE_DASHBOARD', 'dashboard')
    .config([
        '$stateProvider', 'STATE_DASHBOARD', function ($stateProvider, STATE_DASHBOARD) {
            $stateProvider
                .state(STATE_DASHBOARD, {
                    parent: 'page',
                    controller: 'dashboardCtrl',
                    templateUrl: 'app_components/dashboardModule/views/dashboard.html',
                    url: '/'
                });
        }]);
