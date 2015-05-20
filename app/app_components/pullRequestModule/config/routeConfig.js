'use strict';

angular.module('pullRequestModule')
    .constant('STATE_DASHBOARD', 'dashboard')
    .config([
        '$stateProvider', 'STATE_DASHBOARD', function ($stateProvider, STATE_DASHBOARD) {
            $stateProvider
                .state(STATE_DASHBOARD, {
                    parent: 'page',
                    controller: 'dashboardCtrl',
                    data: {requireLogin: true},
                    templateUrl: 'app_components/pullRequestModule/views/dashboard/dashboard.html',
                    url: '/'
                });
        }]);
