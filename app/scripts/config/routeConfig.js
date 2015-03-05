'use strict';
angular.module('gpullr')
    /*jshint maxparams:false */
    .config([
        '$locationProvider', '$stateProvider', '$urlRouterProvider', 'LOCATION_DASHBOARD', 'LOCATION_LOGIN', function ($locationProvider, $stateProvider, $urlRouterProvider, LOCATION_DASHBOARD, LOCATION_LOGIN) {

        $locationProvider.html5Mode(true);

        // For any unmatched url, redirect to /
        $urlRouterProvider
            .otherwise('/');

        // Now set up the states
        $stateProvider
            .state('page', {
                abstract: true,
                templateUrl: 'scripts/views/page.html'
            })
            .state('pageWithoutHeader', {
                abstract: true,
                templateUrl: 'scripts/views/pageWithoutHeader.html'
            })
            .state('dashboard', {
                parent: 'page',
                controller: 'dashboardCtrl',
                templateUrl: 'app_components/dashboardModule/views/dashboard.html',
                url: LOCATION_DASHBOARD
            })
            .state('login', {
                parent: 'page',
                controller: 'loginCtrl',
                templateUrl: 'app_components/loginModule/views/login.html',
                url: LOCATION_LOGIN
            });
    }]);
