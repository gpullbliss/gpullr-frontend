'use strict';
angular.module('headerModule')
    /* jshint maxparams:false */
    .controller('headerCtrl', ['$scope', '$rootScope', 'userService', 'STATE_STATS', 'STATE_DASHBOARD',
        function ($scope, $rootScope, userService, STATE_STATS, STATE_DASHBOARD) {
            $scope.navBar = [
                {title: 'All Requests', bubble: true, state: STATE_DASHBOARD},
                {title: 'Ranking', bubble: false, state: STATE_STATS}
            ];

            $rootScope.$on('changeRequestCount', function (event, requestCount) {
                $scope.requestCount = requestCount;
            });

            $rootScope.$on('updateUser', function (event, user) {
                $scope.user = user;
            });

            userService.getCurrentUser();
        }]);
