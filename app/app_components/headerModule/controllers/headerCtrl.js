'use strict';
angular.module('headerModule')
    /* jshint maxparams:false */
    .controller('headerCtrl', ['$scope', '$rootScope', 'userService', 'UserNameService', 'STATE_STATS', 'STATE_DASHBOARD', 'STATE_REPO_FILTER',
        function ($scope, $rootScope, userService, userNameService, STATE_STATS, STATE_DASHBOARD, STATE_REPO_FILTER) {
            $scope.navBar = [
                {title: 'All Requests', bubble: true, state: STATE_DASHBOARD},
                {title: 'Ranking', bubble: false, state: STATE_STATS},
                {title: 'Settings', bubble: false, state: STATE_REPO_FILTER}
            ];
            $scope.getName = userNameService.getName;
            userService.getCurrentUser();

            $rootScope.$on('changeRequestCount', function (event, requestCount) {
                $scope.requestCount = requestCount;
            });

        }]
);
