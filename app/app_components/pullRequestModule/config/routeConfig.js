'use strict';

angular.module('pullRequestModule')
    .constant('STATE_DASHBOARD', 'dashboard')
    .constant('STATE_WALLBOARD', 'wallboard')
    .config([
        '$stateProvider', 'STATE_DASHBOARD', 'STATE_WALLBOARD', function ($stateProvider, STATE_DASHBOARD, STATE_WALLBOARD) {
            $stateProvider
                .state(STATE_DASHBOARD, {
                    parent: 'page',
                    controller: 'dashboardCtrl',
                    data: {requireLogin: true},
                    templateUrl: 'app_components/pullRequestModule/views/dashboard.html',
                    url: '/'
                })
                .state(STATE_WALLBOARD, {
                    parent: 'pageWithoutHeader',
                    controller: 'wallboardCtrl',
                    templateUrl: 'app_components/pullRequestModule/views/wallboard.html',
                    url: '/wallboard?repos'
                });
        }]);
