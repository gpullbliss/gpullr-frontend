'use strict';
angular.module('gpullr')
    .config([
        '$locationProvider', '$urlRouterProvider', '$stateProvider', function ($locationProvider, $urlRouterProvider, $stateProvider) {
            $locationProvider.html5Mode(true);

            // For any unmatched url, redirect to /
            $urlRouterProvider
                .otherwise('/');

            // Set up the basic parent states
            $stateProvider
                .state('page', {
                    abstract: true,
                    templateUrl: 'views/page.html'
                })
                .state('pageWithoutHeader', {
                    abstract: true,
                    templateUrl: 'views/pageWithoutHeader.html'
                });
        }]);
