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
        }])
    .run(['$rootScope', '$state', 'userService', 'STATE_LOGIN', function ($rootScope, $state, userService, STATE_LOGIN) {
        /* jshint maxparams: false */
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            var stateData = toState.data || {};

            console.log('stateData', stateData);
            if (stateData.requireLogin) {
                event.preventDefault();

                console.log('$stateChangeStart getCurrentUser');
                userService.getCurrentUser().then(function () {
                    $state.go(toState, toParams, {notify: false}).then(function () {
                        // workaround for currently broken notify: false
                        // see https://github.com/angular-ui/ui-router/issues/178
                        $rootScope.$broadcast('$stateChangeSuccess', toState, toParams, fromState, fromParams);
                    });
                }, function () {
                    $state.go(STATE_LOGIN);
                });
            }
        });
    }]);
