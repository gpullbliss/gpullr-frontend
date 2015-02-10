'use strict';
angular.module('gpullr')
    .config(['$locationProvider', '$stateProvider', '$urlRouterProvider', function ($locationProvider, $stateProvider, $urlRouterProvider) {

        $locationProvider.html5Mode(true);

        // For any unmatched url, redirect to /
        $urlRouterProvider
            .otherwise('/');

        // Now set up the states
        $stateProvider
            .state('dashboard', {
                controller: 'dashboardCtrl',
                templateUrl: 'app_components/dashboardModule/views/dashboard.html',
                url: '/'
            });
    }]);
