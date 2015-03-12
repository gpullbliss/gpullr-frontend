'use strict';
angular.module('headerModule')
    /* jshint maxparams:false */
    .controller('headerCtrl', ['$scope', '$rootScope', 'userService', 'STATE_STATS', 'STATE_DASHBOARD',
        function ($scope, $rootScope, userService, STATE_STATS, STATE_DASHBOARD) {

            $scope.userPresent = false;

            var navBar = [
                {title: 'All Requests', bubble: true, state: STATE_DASHBOARD},
                {title: 'Ranking', bubble: false, state: STATE_STATS}
            ];

            $rootScope.$on('changeRequestCount', function (event, data) {
                $scope.requestCount = data;
            });

            $rootScope.$on('updateUser', function (event, data) {
                $scope.username = data.username;
                $scope.avatarUrl = data.avatarUrl;
                $scope.userPresent = true;
            });

            $scope.navBar = navBar;

            userService.whoAmI();
        }]);
